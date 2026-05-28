from fastapi import APIRouter, Depends, status

from app.models.category import CategoryCreate, CategoryPublic
from app.models.game import GamePublic
from app.services import categories_service
from app.utils.security import require_admin


router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("/", response_model=list[CategoryPublic])
def get_categories():
    return categories_service.list_categories()


@router.post("/", response_model=CategoryPublic, status_code=status.HTTP_201_CREATED)
def create_category(
    category: CategoryCreate,
    current_user: dict = Depends(require_admin),
):
    return categories_service.create_category(category)


@router.get("/{category_id}", response_model=CategoryPublic)
def get_category(category_id: str):
    return categories_service.get_category(category_id)


@router.get("/{category_id}/games", response_model=list[GamePublic])
def get_games_by_category(category_id: str):
    return categories_service.list_games_by_category(category_id)
