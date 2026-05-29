from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class CategoryWinnerPublic(BaseModel):
    id: str
    name: str
    vote_count: int

class CategoryCreate(BaseModel):
    name: str = Field(min_length=3)
    image: str
    description: str
    datetime_closes: datetime | str

class CategoryUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=3)
    image: Optional[str] = None
    description: Optional[str] = None
    datetime_closes: Optional[datetime | str] = None

class CategoryPublic(BaseModel):
    id: str
    name: str
    image: str
    description: str
    datetime_closes: datetime
    is_closed: bool = False
    winner: Optional[CategoryWinnerPublic] = None
