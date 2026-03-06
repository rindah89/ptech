from fastapi import APIRouter, Depends
from typing import List
from ...dependencies import current_user_dependency, db_dependency
from ...schemas.vehicle import VehicleCreate, VehicleResponse
from ...services.vehicle_service import vehicle_service

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])

@router.get("/", response_model=List[VehicleResponse])
async def read_user_vehicles(current_user: current_user_dependency, db: db_dependency):
    return await vehicle_service.get_user_vehicles(db, current_user.id)

@router.post("/", response_model=VehicleResponse, status_code=201)
async def create_vehicle(vehicle: VehicleCreate, current_user: current_user_dependency, db: db_dependency):
    return await vehicle_service.register_vehicle(db, vehicle_in=vehicle, user_id=current_user.id)
