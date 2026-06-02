from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.cosmetic import Cosmetic
from schemas.cosmetic import CosmeticCreate, CosmeticResponse
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
        user_id = int(payload.get("sub"))
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="認証エラー")

# コスメ一覧取得
@router.get("/", response_model=list[CosmeticResponse])
def get_cosmetics(db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    return db.query(Cosmetic).filter(Cosmetic.user_id == user_id).all()

@router.get("/{cosmetic_id}", response_model=CosmeticResponse)
def get_cosmetic(cosmetic_id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    cosmetic = db.query(Cosmetic).filter(Cosmetic.id == cosmetic_id, Cosmetic.user_id == user_id).first()
    if not cosmetic:
        raise HTTPException(status_code=404, detail="コスメが見つかりません")
    return cosmetic

# コスメ登録
@router.post("/", response_model=CosmeticResponse)
def create_cosmetic(cosmetic: CosmeticCreate,db: Session = Depends(get_db),user_id: int = Depends(get_current_user_id)):
    new_cosmetic = Cosmetic(
        user_id=user_id,
        name=cosmetic.name,
        brand=cosmetic.brand,
        category=cosmetic.category,
        color_code=cosmetic.color_code,
        status=cosmetic.status,
        rating=cosmetic.rating,
    )
    db.add(new_cosmetic)
    db.commit()
    db.refresh(new_cosmetic)
    return new_cosmetic

# コスメ削除
@router.delete("/{cosmetic_id}")
def delete_cosmetic(cosmetic_id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    cosmetic = db.query(Cosmetic).filter(Cosmetic.id == cosmetic_id, Cosmetic.user_id == user_id).first()
    if not cosmetic:
        raise HTTPException(status_code=404, detail="コスメが見つかりません")
    db.delete(cosmetic)
    db.commit()
    return {"message": "削除しました"}

@router.put("/{cosmetic_id}", response_model=CosmeticResponse)
def update_cosmetic(cosmetic_id: int, cosmetic: CosmeticCreate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    db_cosmetic = db.query(Cosmetic).filter(Cosmetic.id == cosmetic_id, Cosmetic.user_id == user_id).first()
    if not db_cosmetic:
        raise HTTPException(status_code=404, detail="コスメが見つかりません")
    db_cosmetic.name = cosmetic.name
    db_cosmetic.brand = cosmetic.brand
    db_cosmetic.category = cosmetic.category
    db_cosmetic.color_code = cosmetic.color_code
    db_cosmetic.status = cosmetic.status
    db_cosmetic.rating = cosmetic.rating
    db.commit()
    db.refresh(db_cosmetic)
    return db_cosmetic
