from pydantic import BaseModel, Field
from typing import Optional


class GameCategoryPublic(BaseModel):
    id: str
    name: str

class GameCreate(BaseModel):
    name: str = Field(min_length=2)
    description: str
    image: str
    developer: str
    platforms: str
    release_date: str
    user_score: int
    category_ids: list[str]

class GameUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=2)
    description: Optional[str] = None
    image: Optional[str] = None
    developer: Optional[str] = None
    platforms: Optional[str] = None
    release_date: Optional[str] = None
    user_score: Optional[int] = None
    category_ids: Optional[list[str]] = None

class GamePublic(BaseModel):
    id: str
    name: str
    description: str
    image: str
    developer: str
    platforms: str
    release_date: str
    user_score: int
    category_ids: list[str]
    categories: list[GameCategoryPublic] = Field(default_factory=list)
    vote_count: int = 0


class VoteResponse(BaseModel):
    game_id: str
    category_id: str
    vote_count: int
    message: str
