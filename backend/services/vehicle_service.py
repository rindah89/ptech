from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from typing import List

from ..repositories import vehicle_repo
from ..schemas.vehicle import VehicleCreate
from ..models import Vehicle

class VehicleService:
    async def get_user_vehicles(self, db: AsyncSession, user_id: UUID) -> List[Vehicle]:
        return await vehicle_repo.get_by_user(db, user_id=user_id)

    async def register_vehicle(self, db: AsyncSession, vehicle_in: VehicleCreate, user_id: UUID) -> Vehicle:
        # Map pydantic object to model + required FK
        db_vehicle = Vehicle(**vehicle_in.model_dump(), user_id=user_id)
        db.add(db_vehicle)
        await db.commit()
        await db.refresh(db_vehicle)
        return db_vehicle

vehicle_service = VehicleService()
