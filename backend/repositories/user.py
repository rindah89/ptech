from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from .base import BaseRepository
from ..models.user import User
from ..schemas.user import UserCreate, UserBase

class UserRepository(BaseRepository[User, UserCreate, UserBase]):
    async def get_by_phone_number(self, db: AsyncSession, phone_number: str) -> Optional[User]:
        query = select(self.model).where(self.model.phone_number == phone_number)
        result = await db.execute(query)
        return result.scalar_one_or_none()

user_repo = UserRepository(User)
