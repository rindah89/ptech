from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from .base import BaseRepository
from ..models.user import User
from ..schemas.user import UserCreate, UserBase

class UserRepository(BaseRepository[User, UserCreate, UserBase]):
    async def get_by_email(self, db: AsyncSession, email: str) -> Optional[User]:
        query = select(self.model).where(self.model.email == email)
        result = await db.execute(query)
        return result.scalar_first()

