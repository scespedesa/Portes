from fastapi import APIRouter , Depends , HTTPException
from sqlalchemy.orm import Session

from app.database import get_db , SessionLocal
from app.models.incident import Incident
from app.models.user import User
from sqlalchemy.orm import joinedload

from app.schemas.incident import IncidentResponse
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
    incidents  = (current_user.query(Incident).options(joinedload(Incident.porte)).all())
    return incidents

@router.get("/porte/{porte_id}",  response_model=list[IncidentResponse])
def get_incidents(
    porte_id: int
):
    db = SessionLocal()
    
    incidents  = (db.query(Incident).filter(Incident.porte_id==porte_id).all())
    db.close()
    print(incidents)
    if incidents is None : 
        raise HTTPException(
            status_code=404,
            detail="Incidents non trouvée"
        )       
    return incidents

@router.delete("/{porte_id}",  response_model=list[IncidentResponse])
def delete_incident(
    incident_id: int , 
    porte_id: int
):
    db = SessionLocal()
    
    # incidents  = (db.query(Incident).filter(Incident.porte_id==porte_id).all())


    incident = db.query(Incident).filter(
            Incident.id == incident_id
        ).first()

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident non trouvé"
        )

    db.delete(incident)

    db.close()

    return incident



