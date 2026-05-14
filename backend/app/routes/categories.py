from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.database import categories_collection, games_collection
from app.models.category import CategoryCreate

router = APIRouter(prefix="/categories", tags=["categories"])

def category_to_dict(category):
    return {
        "id": str(category["_id"]),
        "name": category["name"],
        "image": category["image"],
        "description": category["description"],
        "datetime_closes": category["datetime_closes"],
    }

def game_to_dict(game):
    return {
        "id": str(game["_id"]),
        "name": game["name"],
        "description": game["description"],
        "image": game["image"],
        "category_ids": game.get("category_ids", []),
    }

@router.get("/")
def get_categories():
    categories = categories_collection.find()
    return [category_to_dict(category) for category in categories]

@router.post("/")
def create_category(category: CategoryCreate):
    result = categories_collection.insert_one(category.model_dump())

    return {
        "id": str(result.inserted_id),
        **category.model_dump()
    }

@router.get("/{category_id}")
def get_category(category_id: str):
    category = categories_collection.find_one({"_id": ObjectId(category_id)})

    if not category:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    return category_to_dict(category)

@router.get("/{category_id}/games")
def get_games_by_category(category_id: str):
    category = categories_collection.find_one({"_id": ObjectId(category_id)})

    if not category:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    games = games_collection.find({
        "category_ids": category_id
    })

    return [game_to_dict(game) for game in games]