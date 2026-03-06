import enum
from sqlalchemy import Column, String, Numeric, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from ..database import Base
from .base import UUIDMixin, TimestampMixin

class TransactionType(str, enum.Enum):
    deposit = "deposit"
    withdrawal = "withdrawal"
    payment = "payment"

class TransactionStatus(str, enum.Enum):
    pending = "pending"
    success = "success"
    failed = "failed"

class Transaction(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "transactions"

    user_id = Column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    amount = Column(Numeric(10, 2), nullable=False)
    
    type = Column(SQLEnum(TransactionType), nullable=False)
    status = Column(SQLEnum(TransactionStatus), default=TransactionStatus.pending, nullable=False)
    reference = Column(String(100), unique=True, nullable=True) # E.g., Mobile Money Reciept Number

    # Relationships
    user = relationship("User", back_populates="transactions")
