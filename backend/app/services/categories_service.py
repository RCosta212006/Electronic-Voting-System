from datetime import datetime, timezone

from fastapi import HTTPException, status

from app.database import categories_collection, games_collection, votes_collection
from app.models.category import CategoryCreate, CategoryUpdate
from app.services.games_service import serialize_game
from app.services.votes_service import (
    count_votes_for_game_in_category,
    get_winner_for_category,
)
from app.utils.dates import to_utc_datetime
from app.utils.object_id import parse_object_id


def serialize_category(category: dict) -> dict:
    datetime_closes = to_utc_datetime(category["datetime_closes"])
    is_closed = datetime.now(timezone.utc) >= datetime_closes

    return {
        "id": str(category["_id"]),
        "name": category["name"],
        "image": category["image"],
        "description": category["description"],
        "datetime_closes": datetime_closes,
        "is_closed": is_closed,
        "winner": get_winner_for_category(str(category["_id"])) if is_closed else None,
    }


def list_categories() -> list[dict]:
    categories = categories_collection.find()
    return [serialize_category(category) for category in categories]


def create_category(category: CategoryCreate) -> dict:
    category_doc = category.model_dump()
    category_doc["datetime_closes"] = to_utc_datetime(category_doc["datetime_closes"])
    result = categories_collection.insert_one(category_doc)

    created_category = {
        "_id": result.inserted_id,
        **category_doc,
    }

    return {
        "id": str(result.inserted_id),
        **serialize_category(created_category),
    }


def get_category(category_id: str) -> dict:
    category = categories_collection.find_one({
        "_id": parse_object_id(category_id, "category_id")
    })

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Categoria nao encontrada",
        )

    return serialize_category(category)


def update_category(category_id: str, category: CategoryUpdate) -> dict:
    category_object_id = parse_object_id(category_id, "category_id")
    update_doc = category.model_dump(exclude_unset=True)

    if "datetime_closes" in update_doc:
        update_doc["datetime_closes"] = to_utc_datetime(update_doc["datetime_closes"])

    if not update_doc:
        return get_category(category_id)

    result = categories_collection.update_one(
        {"_id": category_object_id},
        {"$set": update_doc},
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Categoria nao encontrada",
        )

    return get_category(category_id)


def list_games_by_category(category_id: str) -> list[dict]:
    get_category(category_id)

    games = games_collection.find({
        "category_ids": {"$in": [category_id]}
    })

    return [
        {
            **serialize_game(game, include_categories=False),
            "vote_count": count_votes_for_game_in_category(str(game["_id"]), category_id),
        }
        for game in games
    ]

def delete_category(category_id: str) -> dict:
    category_object_id = parse_object_id(category_id, "category_id")

    result = categories_collection.delete_one({"_id": category_object_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Categoria nao encontrada")

    games_collection.update_many(
        {"category_ids": category_id},
        {"$pull": {"category_ids": category_id}},
    )

    votes_collection.delete_many({"category_id": category_id})

    return {
        "message": "Categoria apagada com sucesso",
        "category_id": category_id,
    }
