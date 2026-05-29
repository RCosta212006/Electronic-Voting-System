from fastapi import APIRouter, Depends, status

from app.models.category import CategoryCreate, CategoryPublic, CategoryUpdate
from app.models.game import GamePublic, VoteResponse
from app.services import categories_service, votes_service
from app.utils.security import get_current_user


router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("/", response_model=list[CategoryPublic])
def get_categories():
    return categories_service.list_categories()


@router.post("/", response_model=CategoryPublic, status_code=status.HTTP_201_CREATED)
def create_category(category: CategoryCreate):
    return categories_service.create_category(category)


@router.get("/{category_id}", response_model=CategoryPublic)
def get_category(category_id: str):
    return categories_service.get_category(category_id)


@router.patch("/{category_id}", response_model=CategoryPublic)
def update_category(
    category_id: str,
    category: CategoryUpdate,
):
    return categories_service.update_category(category_id, category)


@router.get("/{category_id}/games", response_model=list[GamePublic])
def get_games_by_category(category_id: str):
    return categories_service.list_games_by_category(category_id)

@router.delete("/{category_id}")
def delete_category(category_id: str):
    return categories_service.delete_category(category_id)


@router.post(
    "/{category_id}/games/{game_id}/vote",
    response_model=VoteResponse,
    status_code=status.HTTP_201_CREATED,
)
def vote_for_game(
    category_id: str,
    game_id: str,
    current_user: dict = Depends(get_current_user),
):
    return votes_service.create_vote(category_id, game_id, current_user)
