import os


MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
MONGO_DB = os.getenv("MONGO_DB", "sve")

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "60"))


def get_jwt_secret() -> str:
    if not JWT_SECRET:
        raise RuntimeError("JWT_SECRET environment variable is required")

    return JWT_SECRET
