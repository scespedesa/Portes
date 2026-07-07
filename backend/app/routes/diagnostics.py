from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.diagnostic import Diagnostic
from app.schemas.diagnostic import DiagnosticCreate , DiagnosticResponse

router = APIRouter (
    prefix="/api/portes",
    tags=["Diagnostics"]
)

@router.post(
    "/{porte_id}/diagnostics",
    response_model=DiagnosticResponse
)
def creer_diagnostic(
    porte_id: int,
    diagnostic: DiagnosticCreate,
    db: Session = Depends(get_db)
):
    nouveau_diagnostic =  Diagnostic(
        porte_id=porte_id,
        **diagnostic.model_dump()
    )
    db.add(nouveau_diagnostic)
    db.commit()
    db.refresh(nouveau_diagnostic)

    return nouveau_diagnostic

@router.get(
    "/{porte_id}/diagnostics",response_model=list[DiagnosticResponse]
)
def liste_diagnostics(
    porte_id: int ,
    db: Session = Depends(get_db)
):
    return db.query(Diagnostic).filter(Diagnostic.porte_id==porte_id).all()