from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID

from .base import BaseRepository
from ..models import Vehicle, ParkingSession, Transaction
from ..schemas.vehicle import VehicleCreate, VehicleBase
from ..schemas.parking_session import ParkingSessionCreate, ParkingSessionBase
from ..schemas.transaction import TransactionCreate, TransactionBase

class VehicleRepository(BaseRepository[Vehicle, VehicleCreate, VehicleBase]):
    async def get_by_user(self, db: AsyncSession, user_id: UUID) -> List[Vehicle]:
        query = select(self.model).where(self.model.user_id == user_id)
        result = await db.execute(query)
        return result.scalars().all()

class ParkingSessionRepository(BaseRepository[ParkingSession, ParkingSessionCreate, ParkingSessionBase]):
    async def get_active_for_vehicle(self, db: AsyncSession, vehicle_id: UUID) -> List[ParkingSession]:
        from ..models.parking_session import SessionStatus
        query = select(self.model).where(
            self.model.vehicle_id == vehicle_id, 
            self.model.status == SessionStatus.active
        )
        result = await db.execute(query)
        return result.scalars().all()

class TransactionRepository(BaseRepository[Transaction, TransactionCreate, TransactionBase]):
    async def get_by_user(self, db: AsyncSession, user_id: UUID) -> List[Transaction]:
        query = select(self.model).where(self.model.user_id == user_id).order_by(self.model.created_at.desc())
        result = await db.execute(query)
        return result.scalars().all()

vehicle_repo = VehicleRepository(Vehicle)
session_repo = ParkingSessionRepository(ParkingSession)
transaction_repo = TransactionRepository(Transaction)
