from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
# Import all models so metadata knows about them before create_all
from .models import *  
from .api.routers import auth_router, users_router, vehicles_router, parking_router, transactions_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all tables in the database
    # In a full production environment, this would be handled by Alembic migrations
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Clean up
    await engine.dispose()

app = FastAPI(
    title="PTech API",
    description="Backend API for the PTech Mobile Application",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
# Adjust origins in production to specific frontend domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth_router, prefix="/api")
app.include_router(users_router, prefix="/api")
app.include_router(vehicles_router, prefix="/api")
app.include_router(parking_router, prefix="/api")
app.include_router(transactions_router, prefix="/api")

@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "ok", "message": "PTech API is running"}
