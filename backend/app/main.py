from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.categories import router as categories_router
from app.routes.games import router as games_router

app = FastAPI(title="SVE API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "SVE API online"}

app.include_router(auth_router)
app.include_router(categories_router)
app.include_router(games_router)