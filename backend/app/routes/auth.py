from fastapi import APIRouter, HTTPException, status
from pymongo.errors import DuplicateKeyError
from bson import ObjectId

from app.database import users_collection
from app.models.user import UserCreate, UserLogin
from app.utils.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserCreate):
    user_doc = {
        "name": user.name,
        "email": user.email.lower(),
        "password_hash": hash_password(user.password),
        "role": "voter"
    }

    try:
        result = users_collection.insert_one(user_doc)
    except DuplicateKeyError:
        raise HTTPException(status_code=409, detail="Este email já está registado")

    return {
        "id": str(result.inserted_id),
        "name": user.name,
        "email": user.email.lower()
    }

@router.post("/login")
def login(credentials: UserLogin):
    user = users_collection.find_one({"email": credentials.email.lower()})

    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Email ou palavra-passe inválidos")

    token = create_access_token({
        "sub": str(user["_id"]),
        "email": user["email"],
        "role": user.get("role", "voter")
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }