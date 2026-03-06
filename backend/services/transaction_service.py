from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from typing import List
from decimal import Decimal

from ..repositories import transaction_repo, user_repo
from ..schemas.transaction import TransactionCreate
from ..models import Transaction, TransactionStatus

class TransactionService:
    async def get_user_transactions(self, db: AsyncSession, user_id: UUID) -> List[Transaction]:
        return await transaction_repo.get_by_user(db, user_id)

    async def process_transaction(self, db: AsyncSession, user_id: UUID, transaction_in: TransactionCreate) -> Transaction:
        from ..models.transaction import TransactionType
        user = await user_repo.get(db, user_id)
        if not user:
            raise ValueError("User not found")

        amount = transaction_in.amount
        if transaction_in.type in [TransactionType.payment, TransactionType.withdrawal]:
            if user.balance < amount:
                raise ValueError("Insufficient balance")
            user.balance -= amount
        elif transaction_in.type == TransactionType.deposit:
            user.balance += amount

        db_transaction = Transaction(
            user_id=user_id,
            amount=amount,
            type=transaction_in.type,
            status=TransactionStatus.success # Auto-success for simplicity
        )

        db.add(user)
        db.add(db_transaction)
        await db.commit()
        await db.refresh(db_transaction)
        return db_transaction

transaction_service = TransactionService()
