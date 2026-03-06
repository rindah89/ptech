import os
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Get DATABASE_URL from env or use default for local dev
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://ptech_user:ptech_password@localhost:5432/ptech_db")

engine = create_async_engine(DATABASE_URL, echo=True)

# Async session factory
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
