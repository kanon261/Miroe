from sqlalchemy import Column, String, DateTime, Integer
from sqlalchemy.dialects.mysql import BIGINT
from datetime import datetime
from database import Base

class PersonalInfo(Base):
    __tablename__ = "personal_info"

    id = Column(BIGINT(unsigned=True), primary_key=True, autoincrement=True)
    user_id = Column(Integer, nullable=False, unique=True)
    personal_color = Column(String(50))
    skeleton_type = Column(String(50))
    face_type = Column(String(50))
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)