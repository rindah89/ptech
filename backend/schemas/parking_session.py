from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from typing import Optional
from decimal import Decimal
from ..models.parking_session import SessionStatus

class ParkingSessionBase(BaseModel):
    vehicle_id: UUID
    zone: str = Field(..., max_length=50)

class ParkingSessionCreate(ParkingSessionBase):
    pass

class ParkingSessionResponse(ParkingSessionBase):
    id: UUID
    start_time: datetime
    end_time: Optional[datetime]
    total_cost: Optional[Decimal]
    status: SessionStatus
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
