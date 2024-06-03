from fastapi import APIRouter

from .api import api

router = APIRouter()
router.include_router(api.router)


@router.get(path="/health", summary="Health Check")
@router.head(path="/health", summary="Health Check")
async def health():
    return {"status": "OK"}
