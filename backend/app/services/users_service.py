from fastapi import HTTPException, status

from app.database import users_collection
from app.utils.object_id import parse_object_id


def serialize_user(user: dict) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user.get("role", "voter"),
    }


def list_users() -> list[dict]:
    users = users_collection.find()
    return [serialize_user(user) for user in users]


def get_user(user_id: str) -> dict:
    user = users_collection.find_one({"_id": parse_object_id(user_id, "user_id")})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilizador nao encontrado",
        )

    return serialize_user(user)
