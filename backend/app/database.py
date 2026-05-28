from pymongo import MongoClient

from app.config.settings import MONGO_DB, MONGO_URL

client = MongoClient(MONGO_URL)
db = client[MONGO_DB]

users_collection = db["users"]
categories_collection = db["categories"]
games_collection = db["games"]
votes_collection = db["votes"]

users_collection.create_index("email", unique=True)
votes_collection.create_index(
    [("user_id", 1), ("category_id", 1)],
    unique=True,
)
