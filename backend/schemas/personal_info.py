from pydantic import BaseModel
from typing import Optional

class PersonalInfoCreate(BaseModel):
    personal_color: Optional[str] = None
    skeleton_type: Optional[str] = None
    face_type: Optional[str] = None

class PersonalInfoResponse(BaseModel):
    id: int
    user_id: int
    personal_color: Optional[str] = None
    skeleton_type: Optional[str] = None
    face_type: Optional[str] = None

    class Config:
        from_attributes = True