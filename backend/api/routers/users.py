from fastapi import APIRouter, Depends
from ...dependencies import current_user_dependency, db_dependency
from ...schemas.user import UserResponse
from ...services.user_service import user_service

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: current_user_dependency):
    return current_user
