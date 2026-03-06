from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from datetime import datetime
from typing import List

from ..repositories import session_repo
from ..schemas.parking_session import ParkingSessionCreate
from ..models import ParkingSession

class ParkingSessionService:
    async def get_active_sessions(self, db: AsyncSession, vehicle_id: UUID) -> List[ParkingSession]:
        return await session_repo.get_active_for_vehicle(db, vehicle_id=vehicle_id)

    async def start_session(self, db: AsyncSession, session_in: ParkingSessionCreate) -> ParkingSession:
        # Check if already active
        active_sessions = await self.get_active_sessions(db, session_in.vehicle_id)
        if active_sessions:
            raise ValueError("Vehicle already has an active parking session.")

        db_session = ParkingSession(
            vehicle_id=session_in.vehicle_id,
            zone=session_in.zone,
            start_time=datetime.utcnow()
        )
        db.add(db_session)
        await db.commit()
        await db.refresh(db_session)
        return db_session

    async def stop_session(self, db: AsyncSession, session_id: UUID) -> ParkingSession | None:
        from ..models.parking_session import SessionStatus
        session = await session_repo.get(db, session_id)
        if not session or session.status != SessionStatus.active:
            raise ValueError("Session not found or not active")

        session.end_time = datetime.utcnow()
        duration_hours = (session.end_time - session.start_time).total_seconds() / 3600
        # Hardcoding 200 CFA per hour for mockup
        session.total_cost = max(200, round(duration_hours * 200, 2))
        session.status = SessionStatus.completed

        db.add(session)
        await db.commit()
        await db.refresh(session)
        return session

session_service = ParkingSessionService()
