from fastapi import APIRouter , Depends , HTTPException
from sqlalchemy.orm import Session

from sqlalchemy.orm import joinedload

from app.database import get_db , SessionLocal
from app.models.porte import Porte
from app.schemas.porte import PorteCreate , PorteResponse

router = APIRouter (
    prefix="/api/portes",
    tags=["Portes"]
)

@router.post(
    "/",
    response_model=PorteResponse
)
def creer_porte(
    porte: PorteCreate,
    db: Session = Depends(get_db)
):
    nouveau_porte =  Porte(
        **porte.model_dump()
    )
    db.add(nouveau_porte)
    db.commit()
    db.refresh(nouveau_porte)

    return nouveau_porte


@router.get("/")
def liste_portes(
    db: Session = Depends(get_db)
):
    portes  = (db.query(Porte).options(joinedload(Porte.batiment)).all())
    return portes


@router.get(
    "/{porte_id}",response_model=PorteResponse
)
def get_porte(
    porte_id: int 
):
    db = SessionLocal()
    porte =  db.query(Porte).filter(Porte.id==porte_id).first()
    db.close()

    if porte is None:
        raise HTTPException(
            status_code=404,
            detail="Porte non trouvée"
        )
    return porte


# @router.get(
#     "/",response_model=list[PorteResponse]
# )
# def liste_portes(
#     db: Session = Depends(get_db)
# ):
#     return db.query(Porte).all()