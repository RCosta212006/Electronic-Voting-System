from fastapi import APIRouter, status

from app.models.game import GameCreate, GamePublic, GameUpdate
from app.services import games_service


router = APIRouter(prefix="/games", tags=["games"])


@router.get("/", response_model=list[GamePublic])
def get_games():
    return games_service.list_games()


@router.post("/", response_model=GamePublic, status_code=status.HTTP_201_CREATED)
def create_game(game: GameCreate):
    return games_service.create_game(game)


@router.get("/{game_id}", response_model=GamePublic)
def get_game(game_id: str):
    return games_service.get_game(game_id)


@router.patch("/{game_id}", response_model=GamePublic)
def update_game(
    game_id: str,
    game: GameUpdate,
):
    return games_service.update_game(game_id, game)


@router.delete("/{game_id}")
def delete_game(game_id: str):
    return games_service.delete_game(game_id)
