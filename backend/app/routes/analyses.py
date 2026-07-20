from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.analyse import Analyse
from app.schemas.analyse import AnalyseCreate , AnalyseResponse

router = APIRouter (
    prefix="/api/dashboard",
    tags=["Dashboard"]
)

@router.post(
    "/{porte_id}/dashboard",
    response_model=AnalyseResponse
)
def creer_analyse(
    porte_id: int,
    analyse: AnalyseCreate,
    db: Session = Depends(get_db)
):
    nouveau_analyse =  analyse(
        porte_id=porte_id,
        **analyse.model_dump()
    )
    db.add(nouveau_analyse)
    db.commit()
    db.refresh(nouveau_analyse)

    return nouveau_analyse

@router.get(
    "/{porte_id}/analyses",response_model=list[AnalyseResponse]
)
def liste_analyses(
    porte_id: int ,
    db: Session = Depends(get_db)
):
    return db.query(Analyse).filter(Analyse.porte_id==porte_id).all()

@router.get(
    "/",response_model=list[AnalyseResponse]
)
def analyses(
    db: Session = Depends(get_db)
):
    return db.query(Analyse).all()