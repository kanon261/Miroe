from pydantic import BaseModel
from typing import Optional

class CosmeticCreate(BaseModel):
    name: str
    brand: Optional[str] = None
    category: str
    color_code: Optional[str] = None
    status: str
    rating: Optional[int] = None

class CosmeticResponse(BaseModel):
    id: int
    user_id: int
    name: str
    brand: Optional[str] = None
    category: str
    color_code: Optional[str] = None
    status: str
    rating: Optional[int] = None

    class Config:
        from_attributes = True