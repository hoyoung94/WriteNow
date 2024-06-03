from fastapi import APIRouter

from app.router.api.books import books
from app.router.api.trends import trends
from app.router.api.cover import cover

router = APIRouter(prefix="/api")
router.include_router(books.router)
router.include_router(trends.router)
router.include_router(cover.router)
