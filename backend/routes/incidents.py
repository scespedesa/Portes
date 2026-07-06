from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models import Incident
from fastapi.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="templates")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/incidents")
def create_incident(data: dict, db: Session = Depends(get_db)):

    incident = Incident(
        porte_id=None,  # lo conectamos después bien
        type_incident=None,
        priorite=None,
        description=None,
        source="QR"
    )

    db.add(incident)
    db.commit()

    return {"status": "ok"}