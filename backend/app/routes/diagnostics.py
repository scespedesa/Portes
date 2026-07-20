from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.diagnostic import Diagnostic
from app.schemas.diagnostic import DiagnosticCreate , DiagnosticResponse
from sqlalchemy.orm import joinedload

router = APIRouter (
    prefix="/api/diagnostics",
    tags=["Diagnostics"]
)


@router.get("/")
def get_incidents(
    db: Session = Depends(get_db)
):
    diagnostics = (
        db.query(Diagnostic)
        .options(joinedload(Diagnostic.porte))
        .all()
    )

    return diagnostics