from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.database import games_collection, categories_collection
from app.models.game import GameCreate


router = APIRouter(prefix="/games", tags=["games"])

def game_to_dict(game):
    category_ids = game.get("category_ids", [])

    categories = list(categories_collection.find({
        "_id": {"$in": [ObjectId(category_id) for category_id in category_ids]}
    }))

    return {
        "id": str(game["_id"]),
        "name": game["name"],
        "description": game["description"],
        "image": game["image"],
        "category_ids": category_ids,
        "categories": [
            {
                "id": str(category["_id"]),
                "name": category["name"]
            }
            for category in categories
        ]
    }

@router.get("/")
def get_games():
    games = games_collection.find()
    return [game_to_dict(game) for game in games]

@router.post("/")
def create_game(game: GameCreate):
    for category_id in game.category_ids:
        category = categories_collection.find_one({"_id": ObjectId(category_id)})

        if not category:
            raise HTTPException(
                status_code=404,
                detail=f"Categoria não encontrada: {category_id}"
            )

    result = games_collection.insert_one(game.model_dump())

    return {
        "id": str(result.inserted_id),
        **game.model_dump()
    }

@router.get("/{game_id}")
def get_game(game_id: str):
    game = games_collection.find_one({"_id": ObjectId(game_id)})

    if not game:
        raise HTTPException(status_code=404, detail="Jogo não encontrado")

    return game_to_dict(game)