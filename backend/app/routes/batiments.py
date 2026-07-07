from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.batiment import Batiment
from app.schemas.batiment import BatimentCreate , BatimentResponse

router = APIRouter (
    prefix="/api/batiments",
    tags=["Batiments"]
)

@router.post(
    "/",
    response_model=BatimentResponse
)
def creer_batiment(
    batiment: BatimentCreate,
    db: Session = Depends(get_db)
):
    nouveau_batiment =  Batiment(
        nom = batiment.nom,
        description = batiment.description
    )
    db.add(nouveau_batiment)
    db.commit()
    db.refresh(nouveau_batiment)

    return nouveau_batiment

@router.get(
    "/",response_model=list[BatimentResponse]
)
def liste_batiments(
    db: Session = Depends(get_db)
):
    return db.query(Batiment).all()