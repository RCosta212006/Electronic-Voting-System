from fastapi import APIRouter, HTTPException, status
from pymongo.errors import DuplicateKeyError

from app.database import users_collection
from app.models.user import TokenResponse, UserCreate, UserLogin, UserPublic
from app.utils.security import hash_password, verify_password, create_access_token


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate):
    user_doc = {
        "name": user.name,
        "email": user.email.lower(),
        "password_hash": hash_password(user.password),
        "role": user.role,
    }

    try:
        result = users_collection.insert_one(user_doc)
    except DuplicateKeyError:
        raise HTTPException(status_code=409, detail="Este email ja esta registado")

    return {
        "id": str(result.inserted_id),
        "name": user.name,
        "email": user.email.lower(),
        "role": user.role,
    }


@router.post("/login", response_model=TokenResponse)
def login(credentials: UserLogin):
    user = users_collection.find_one({"email": credentials.email.lower()})

    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Email ou palavra-passe invalidos")

    token = create_access_token({
        "sub": str(user["_id"]),
        "email": user["email"],
        "role": user.get("role", "voter"),
    })

    return {
        "access_token": token,
        "token_type": "bearer",
    }
