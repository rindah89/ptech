from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base
from .base import UUIDMixin, TimestampMixin

class Vehicle(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "vehicles"

    user_id = Column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    license_plate = Column(String(20), unique=True, index=True, nullable=False)
    make = Column(String(50), nullable=True)
    model = Column(String(50), nullable=True)
    color = Column(String(30), nullable=True)

    # Relationships
    owner = relationship("User", back_populates="vehicles")
    sessions = relationship("ParkingSession", back_populates="vehicle", cascade="all, delete-orphan")
