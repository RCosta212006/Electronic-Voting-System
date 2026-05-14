from pydantic import BaseModel, Field

class GameCreate(BaseModel):
    name: str = Field(min_length=2)
    description: str
    image: str
    category_ids: list[str]

class GamePublic(BaseModel):
    id: str
    name: str
    description: str
    image: str
    category_ids: list[str]