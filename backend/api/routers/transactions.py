from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ...dependencies import current_user_dependency, db_dependency
from ...schemas.transaction import TransactionCreate, TransactionResponse
from ...services.transaction_service import transaction_service

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.get("/", response_model=List[TransactionResponse])
async def read_transactions(current_user: current_user_dependency, db: db_dependency):
    return await transaction_service.get_user_transactions(db, current_user.id)

@router.post("/", response_model=TransactionResponse, status_code=201)
async def create_transaction(transaction: TransactionCreate, current_user: current_user_dependency, db: db_dependency):
    try:
        return await transaction_service.process_transaction(db, user_id=current_user.id, transaction_in=transaction)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
