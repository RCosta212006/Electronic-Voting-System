from pydantic import BaseModel, Field

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