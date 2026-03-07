from sqlalchemy import Column, String, Numeric, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum
from ..database import Base
from .base import UUIDMixin, TimestampMixin

class UserRole(str, enum.Enum):
    user = "user"
    agent = "agent"
    admin = "admin"

class User(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "users"

    phone_number = Column(String(20), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    balance = Column(Numeric(10, 2), default=0.00, nullable=False)
    role = Column(SQLEnum(UserRole), default=UserRole.user, nullable=False)

    # Relationships
    vehicles = relationship("Vehicle", back_populates="owner", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="user", cascade="all, delete-orphan")
