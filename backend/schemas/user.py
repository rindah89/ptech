from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from datetime import datetime
from typing import Optional
from decimal import Decimal
from ..models.user import UserRole

class UserBase(BaseModel):
    phone_number: str = Field(..., min_length=9, max_length=20)
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserResponse(UserBase):
    id: UUID
    balance: Decimal
    role: UserRole
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
