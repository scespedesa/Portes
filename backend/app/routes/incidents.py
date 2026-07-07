from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.incident import Incident
from app.schemas.incident import IncidentCreate , IncidentResponse

router = APIRouter (
    prefix="/api/portes",
    tags=["Incidents"]
)

@router.post(
    "/{porte_id}/incidents",
    response_model=IncidentResponse
)
def creer_incident(
    porte_id: int,
    incident: IncidentCreate,
    db: Session = Depends(get_db)
):
    nouveau_incident =  Incident(
        porte_id=porte_id,
        type_incident=incident.type_incident,
        description=incident.description,
        localisation_dommage=incident.localisation_dommage
    )
    db.add(nouveau_incident)
    db.commit()
    db.refresh(nouveau_incident)

    return nouveau_incident

@router.get(
    "/{porte_id}/incidents",response_model=list[IncidentResponse]
)
def liste_incidents(
    porte_id: int ,
    db: Session = Depends(get_db)
):
    return db.query(Incident).filter(Incident.porte_id==porte_id).all()