import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime
from sqlalchemy.dialects.postgresql import UUID

class TimestampMixin:
    """Provides created_at and updated_at columns for standardizing timestamps."""
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class UUIDMixin:
    """Provides a standardized UUID primary key."""
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
