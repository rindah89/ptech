from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from typing import Optional
from decimal import Decimal
from ..models.transaction import TransactionType, TransactionStatus

class TransactionBase(BaseModel):
    amount: Decimal = Field(..., gt=0, decimal_places=2)
    type: TransactionType

class TransactionCreate(TransactionBase):
    pass

class TransactionResponse(TransactionBase):
    id: UUID
    user_id: UUID
    status: TransactionStatus
    reference: Optional[str]
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
