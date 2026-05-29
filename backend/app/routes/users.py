from fastapi import APIRouter

from app.models.user import UserPublic
from app.services import users_service


router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=list[UserPublic])
def get_users():
    return users_service.list_users()


@router.get("/{user_id}", response_model=UserPublic)
def get_user(user_id: str):
    return users_service.get_user(user_id)
