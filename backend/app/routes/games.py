from fastapi import APIRouter, Depends, status

from app.models.game import GameCreate, GamePublic
from app.services import games_service
from app.utils.security import require_admin


router = APIRouter(prefix="/games", tags=["games"])


@router.get("/", response_model=list[GamePublic])
def get_games():
    return games_service.list_games()


@router.post("/", response_model=GamePublic, status_code=status.HTTP_201_CREATED)
def create_game(game: GameCreate, current_user: dict = Depends(require_admin)):
    return games_service.create_game(game)


@router.get("/{game_id}", response_model=GamePublic)
def get_game(game_id: str):
    return games_service.get_game(game_id)


@router.delete("/{game_id}")
def delete_game(game_id: str, current_user: dict = Depends(require_admin)):
    return games_service.delete_game(game_id)
