from fastapi import HTTPException, status

from app.database import categories_collection, games_collection
from app.models.category import CategoryCreate
from app.services.games_service import serialize_game
from app.utils.object_id import parse_object_id


def serialize_category(category: dict) -> dict:
    return {
        "id": str(category["_id"]),
        "name": category["name"],
        "image": category["image"],
        "description": category["description"],
        "datetime_closes": category["datetime_closes"],
    }


def list_categories() -> list[dict]:
    categories = categories_collection.find()
    return [serialize_category(category) for category in categories]


def create_category(category: CategoryCreate) -> dict:
    category_doc = category.model_dump()
    result = categories_collection.insert_one(category_doc)

    return {
        "id": str(result.inserted_id),
        **category_doc,
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


def list_games_by_category(category_id: str) -> list[dict]:
    get_category(category_id)

    games = games_collection.find({
        "category_ids": {"$in": [category_id]}
    })

    return [serialize_game(game, include_categories=False) for game in games]
