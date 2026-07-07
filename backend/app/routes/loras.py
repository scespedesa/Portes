from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.lora import Lora
from app.schemas.lora import LoraCreate , LoraResponse

router = APIRouter (
    prefix="/api/loras",
    tags=["Loras"]
)

@router.post(
    "/",
    response_model=LoraResponse
)
def creer_lora(
    lora: LoraCreate,
    db: Session = Depends(get_db)
):
    nouveau_Lora =  Lora(
        deveui = lora.deveui,
        active = lora.active
    )
    db.add(nouveau_Lora)
    db.commit()
    db.refresh(nouveau_Lora)

    return nouveau_Lora

@router.get(
    "/",response_model=list[LoraResponse]
)
def liste_loras(
    db: Session = Depends(get_db)
):
    return db.query(Lora).all()