from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from jose import JWTError, jwt
from typing import Annotated
import os

from .database import get_db
from .services import user_service
from .models.user import User

SECRET_KEY = os.getenv("SECRET_KEY", "super_secret_key_change_in_production")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

# Re-exporting for simpler imports in routers
db_dependency = Annotated[AsyncSession, Depends(get_db)]

async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)], 
    db: db_dependency
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        phone_number: str | None = payload.get("sub")
        if phone_number is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = await user_service.get_user_by_phone_number(db, phone_number=phone_number)
    if user is None:
        raise credentials_exception
    return user

current_user_dependency = Annotated[User, Depends(get_current_user)]
