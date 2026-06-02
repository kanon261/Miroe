from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.personal_info import PersonalInfo
from schemas.personal_info import PersonalInfoCreate, PersonalInfoResponse
from jose import jwt, JWTError
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os

router = APIRouter()
security = HTTPBearer()
SECRET_KEY = os.getenv("SECRET_KEY", "secret")
ALGORITHM = "HS256"

def get_current_user_id(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return int(payload.get("sub"))
    except JWTError:
        raise HTTPException(status_code=401, detail="認証エラー")

@router.get("/", response_model=PersonalInfoResponse)
def get_personal_info(db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    info = db.query(PersonalInfo).filter(PersonalInfo.user_id == user_id).first()
    if not info:
        raise HTTPException(status_code=404, detail="パーソナル情報が見つかりません")
    return info

@router.post("/", response_model=PersonalInfoResponse)
def upsert_personal_info(data: PersonalInfoCreate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    info = db.query(PersonalInfo).filter(PersonalInfo.user_id == user_id).first()
    if info:
        info.personal_color = data.personal_color
        info.skeleton_type = data.skeleton_type
        info.face_type = data.face_type
    else:
        info = PersonalInfo(
            user_id=user_id,
            personal_color=data.personal_color,
            skeleton_type=data.skeleton_type,
            face_type=data.face_type,
        )
        db.add(info)
    db.commit()
    db.refresh(info)
    return info