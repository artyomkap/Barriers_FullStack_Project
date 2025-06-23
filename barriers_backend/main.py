from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi.exceptions import HTTPException as FastAPIHTTPException
from database.connect import engine
from database.models import Base

from api import deals, clients, task, report
from api.routers import router as api_router

load_dotenv()

app = FastAPI(
    title="FastAPI with Aiogram and SQLAlchemy",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Подключение роутеров
app.include_router(api_router, prefix="/api")
app.include_router(clients.router, prefix="/api")
app.include_router(deals.router, prefix="/api")
app.include_router(task.router, prefix="/api")
app.include_router(report.router, prefix="/api")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Миграция
async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("startup")
async def startup_event():
    await init_models()

# Обработка ошибок
@app.exception_handler(FastAPIHTTPException)
async def custom_http_exception_handler(request: Request, exc: FastAPIHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

# Запуск
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
