from sqlalchemy import Column, String, DateTime, Enum, Integer
from sqlalchemy.dialects.mysql import TINYINT, BIGINT
from datetime import datetime
from database import Base

class Cosmetic(Base):
    __tablename__ = "cosmetics"

    id = Column(BIGINT(unsigned=True), primary_key=True, autoincrement=True)
    user_id = Column(Integer, nullable=False)
    name = Column(String(255), nullable=False)
    brand = Column(String(255))
    category = Column(Enum("lip", "eye", "cheek"), nullable=False)
    color_code = Column(String(7))
    status = Column(Enum("owned", "wishlist", "tried"), nullable=False)
    rating = Column(TINYINT)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)