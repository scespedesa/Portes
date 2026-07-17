from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.incident import Incident
from app.models.user import User
from sqlalchemy.orm import joinedload

from app.auth.password import get_current_user


router = APIRouter (
    prefix="/api/incidents",
    tags=["Incidents"]
)

@router.get("/")
def get_incidents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    portes  = (db.query(Incident).options(joinedload(Incident.porte)).all())
    return portes




