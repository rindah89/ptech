from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from passlib.context import CryptContext

from ..repositories.user import UserRepository, user_repo
from ..schemas.user import UserCreate
from ..models import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def get_user_by_phone_number(self, db: AsyncSession, phone_number: str) -> User | None:
        return await self.user_repo.get_by_phone_number(db, phone_number=phone_number)

    async def get_user_by_id(self, db: AsyncSession, user_id: UUID) -> User | None:
        return await self.user_repo.get(db, id=user_id)

    async def register_user(self, db: AsyncSession, user_in: UserCreate) -> User:
        # Check if user exists
        existing_user = await self.get_user_by_phone_number(db, user_in.phone_number)
        if existing_user:
            raise ValueError("Phone number already formally registered.")

        # Hash password
        hashed_pw = pwd_context.hash(user_in.password)
        
        # We manually construct dict to add hashed_password instead of plain password
        user_data = user_in.model_dump(exclude={"password"})
        user_data["hashed_password"] = hashed_pw
        
        # Cannot directly pass modified dict to basic create which expects Pydantic model
        # So we circumvent obj_in by creating a temporary internal representation or modifying repo
        db_user = User(**user_data)
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        return db_user

user_service = UserService(user_repo)
