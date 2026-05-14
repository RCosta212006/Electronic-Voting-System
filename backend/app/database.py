import os
from pymongo import MongoClient

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
MONGO_DB = os.getenv("MONGO_DB", "sve")

client = MongoClient(MONGO_URL)
db = client[MONGO_DB]

users_collection = db["users"]
categories_collection = db["categories"]
games_collection = db["games"]

users_collection.create_index("email", unique=True)