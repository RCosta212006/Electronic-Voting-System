from datetime import datetime, timezone

from fastapi import HTTPException, status
from pymongo.errors import DuplicateKeyError

from app.database import categories_collection, games_collection, votes_collection
from app.utils.dates import to_utc_datetime
from app.utils.object_id import parse_object_id


def count_votes_for_game_in_category(game_id: str, category_id: str) -> int:
    return votes_collection.count_documents({
        "game_id": game_id,
        "category_id": category_id,
    })


def get_winner_for_category(category_id: str) -> dict | None:
    pipeline = [
        {"$match": {"category_id": category_id}},
        {"$group": {"_id": "$game_id", "vote_count": {"$sum": 1}}},
        {"$sort": {"vote_count": -1, "_id": 1}},
        {"$limit": 1},
    ]
    winner_vote = next(votes_collection.aggregate(pipeline), None)

    if not winner_vote:
        return None

    game = games_collection.find_one({
        "_id": parse_object_id(winner_vote["_id"], "game_id")
    })

    if not game:
        return None

    return {
        "id": str(game["_id"]),
        "name": game["name"],
        "vote_count": winner_vote["vote_count"],
    }


def create_vote(category_id: str, game_id: str, user: dict) -> dict:
    category_object_id = parse_object_id(category_id, "category_id")
    game_object_id = parse_object_id(game_id, "game_id")

    category = categories_collection.find_one({"_id": category_object_id})
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Categoria nao encontrada",
        )

    datetime_closes = to_utc_datetime(category["datetime_closes"])

    if datetime.now(timezone.utc) >= datetime_closes:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Esta votacao ja encerrou",
        )

    game = games_collection.find_one({"_id": game_object_id})
    if not game:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Jogo nao encontrado",
        )

    if category_id not in game.get("category_ids", []):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este jogo nao pertence a esta categoria",
        )

    vote_doc = {
        "user_id": str(user["_id"]),
        "category_id": category_id,
        "game_id": game_id,
        "created_at": datetime.now(timezone.utc),
    }

    try:
        votes_collection.insert_one(vote_doc)
    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Ja votaste nesta categoria",
        )

    return {
        "game_id": game_id,
        "category_id": category_id,
        "vote_count": count_votes_for_game_in_category(game_id, category_id),
        "message": "Voto registado com sucesso",
    }
