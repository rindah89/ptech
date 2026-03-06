import enum
from sqlalchemy import Column, String, Numeric, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from ..database import Base
from .base import UUIDMixin, TimestampMixin

class SessionStatus(str, enum.Enum):
    active = "active"
    completed = "completed"
    cancelled = "cancelled"

class ParkingSession(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "parking_sessions"

    vehicle_id = Column(ForeignKey("vehicles.id", ondelete="CASCADE"), nullable=False, index=True)
    zone = Column(String(50), nullable=False, index=True)
    
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=True)
    total_cost = Column(Numeric(10, 2), nullable=True)
    
    status = Column(SQLEnum(SessionStatus), default=SessionStatus.active, nullable=False, index=True)

    # Relationships
    vehicle = relationship("Vehicle", back_populates="sessions")
