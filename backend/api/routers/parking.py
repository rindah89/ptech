from fastapi import APIRouter, Depends, HTTPException
from typing import List
from uuid import UUID
from ...dependencies import current_user_dependency, db_dependency
from ...schemas.parking_session import ParkingSessionCreate, ParkingSessionResponse
from ...services.parking_session_service import session_service
from ...services.vehicle_service import vehicle_service

router = APIRouter(prefix="/parking", tags=["Parking Sessions"])

@router.post("/start", response_model=ParkingSessionResponse, status_code=201)
async def start_session(session: ParkingSessionCreate, current_user: current_user_dependency, db: db_dependency):
    # Security: Verify vehicle belongs to user
    vehicles = await vehicle_service.get_user_vehicles(db, current_user.id)
    if session.vehicle_id not in [v.id for v in vehicles]:
        raise HTTPException(status_code=403, detail="Not authorized to park this vehicle")
        
    try:
        return await session_service.start_session(db, session_in=session)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{session_id}/stop", response_model=ParkingSessionResponse)
async def stop_session(session_id: UUID, current_user: current_user_dependency, db: db_dependency):
    try:
        return await session_service.stop_session(db, session_id=session_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
