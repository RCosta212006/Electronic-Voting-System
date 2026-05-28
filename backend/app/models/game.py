from pydantic import BaseModel, Field


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
