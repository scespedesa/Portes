from pydantic import BaseModel
from datetime import datetime


class IncidentCreate(BaseModel):
    type_incident: list[str] | None=None
    description: str | None = None
    localisation_dommage: str | None = None
    symptomes: list[str] | None = None
    fonctionne_auto: str | None = None
    fonctionne_manuel: str | None = None
    securite: str | None = None
    niveau_degradation: int | None = None
    autre_incident: str | None = None
    autre_localisation: str | None = None
    porte_id: int

class IncidentResponse(BaseModel):
    id: int
    porte_id: int
    type_incident: list[str] | None=None
    description: str | None
    localisation_dommage: str | None

    priorite: str | None
    status: str | None
    source: str | None
    date_creation: datetime



    class Config:
        from_attributes = True