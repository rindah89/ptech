from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from typing import Optional

class VehicleBase(BaseModel):
    license_plate: str = Field(..., min_length=2, max_length=20)
    make: Optional[str] = Field(None, max_length=50)
    model: Optional[str] = Field(None, max_length=50)
    color: Optional[str] = Field(None, max_length=30)

class VehicleCreate(VehicleBase):
    pass

class VehicleResponse(VehicleBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
