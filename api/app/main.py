from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.router import router


def get_application() -> FastAPI:
    application = FastAPI()

    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    application.include_router(router.router)

    return application


app = get_application()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app="main:app", reload=True)
