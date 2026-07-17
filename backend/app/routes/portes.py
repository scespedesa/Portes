from fastapi import APIRouter , Depends , HTTPException
from sqlalchemy.orm import Session

from sqlalchemy.orm import joinedload

from app.database import get_db , SessionLocal
from app.models.porte import Porte
from app.schemas.porte import PorteCreate , PorteResponse
from app.models.incident import Incident
from app.schemas.incident import IncidentCreate , IncidentResponse
import app.services.incident_service as incident_service

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

@router.post(
    "/{porte_id}/incident",
    response_model=IncidentResponse
)
def creer_incident(
    porte_id: int,
    incident: IncidentCreate ,
    db: Session = Depends(get_db)
):
    return incident_service.create_incident(db,porte_id,incident)
    

@router.get(
    "/{porte_id}/incidents",response_model=list[IncidentResponse]
)
def liste_incidents(
    porte_id: int ,
    db: Session = Depends(get_db)
):
    return db.query(Incident).filter(Incident.porte_id==porte_id).all()

# @router.post(
#     "/{porte_id}/incidents",
#     response_model=IncidentResponse
# )
# def creer_incident(
#     porte_id: int,
#     incident: IncidentCreate,
#     db: Session = Depends(get_db)
# ):
#     nouveau_incident =  Incident(
#         porte_id=porte_id,
#         type_incident=incident.type_incident,
#         description=incident.description,
#         localisation_dommage=incident.localisation_dommage
#     )
#     db.add(nouveau_incident)
#     db.commit()
#     db.refresh(nouveau_incident)

#     return nouveau_incident

# @router.get(
#     "/",response_model=list[PorteResponse]
# )
# def liste_portes(
#     db: Session = Depends(get_db)
# ):
#     return db.query(Porte).all()