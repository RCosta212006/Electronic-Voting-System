from fastapi import HTTPException, status

from app.database import categories_collection, games_collection
from app.models.game import GameCreate, GameUpdate
from app.utils.object_id import parse_object_id


def serialize_game(game: dict, include_categories: bool = True) -> dict:
    category_ids = game.get("category_ids", [])
    categories = []

    if include_categories and category_ids:
        object_category_ids = [
            parse_object_id(category_id, "category_id")
            for category_id in category_ids
        ]
        categories = list(categories_collection.find({"_id": {"$in": object_category_ids}}))

    return {
        "id": str(game["_id"]),
        "name": game["name"],
        "description": game["description"],
        "technical_description": game.get("technical_description", ""),
        "image": game["image"],
        "developer": game.get("developer", ""),
        "platforms": game.get("platforms", game.get("plataforms", "")),
        "release_date": game.get("release_date", ""),
        "user_score": game.get("user_score", 0),
        "category_ids": category_ids,
        "categories": [
            {
                "id": str(category["_id"]),
                "name": category["name"],
            }
            for category in categories
        ],
    }


def list_games() -> list[dict]:
    games = games_collection.find()
    return [serialize_game(game) for game in games]


def create_game(game: GameCreate) -> dict:
    validate_category_ids(game.category_ids)

    game_doc = game.model_dump()
    result = games_collection.insert_one(game_doc)

    return {
        "id": str(result.inserted_id),
        **game_doc,
        "categories": [],
    }


def validate_category_ids(category_ids: list[str]) -> None:
    for category_id in category_ids:
        category = categories_collection.find_one({
            "_id": parse_object_id(category_id, "category_id")
        })

        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Categoria nao encontrada: {category_id}",
            )


def get_game(game_id: str) -> dict:
    game = games_collection.find_one({"_id": parse_object_id(game_id, "game_id")})

    if not game:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Jogo nao encontrado",
        )

    return serialize_game(game)


def update_game(game_id: str, game: GameUpdate) -> dict:
    game_object_id = parse_object_id(game_id, "game_id")
    update_doc = game.model_dump(exclude_unset=True)

    if "category_ids" in update_doc:
        validate_category_ids(update_doc["category_ids"])

    if not update_doc:
        return get_game(game_id)

    result = games_collection.update_one(
        {"_id": game_object_id},
        {"$set": update_doc},
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Jogo nao encontrado",
        )

    return get_game(game_id)


def delete_game(game_id: str) -> dict:
    result = games_collection.delete_one({"_id": parse_object_id(game_id, "game_id")})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Jogo nao encontrado",
        )

    return {
        "message": "Jogo apagado com sucesso",
        "game_id": game_id,
    }
