from pydantic import BaseModel, Field

class CategoryCreate(BaseModel):
    name: str = Field(min_length=3)
    image: str
    description: str
    datetime_closes: str

class CategoryPublic(BaseModel):
    id: str
    name: str
    image: str
    description: str
    datetime_closes: str