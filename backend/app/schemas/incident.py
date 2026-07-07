from pydantic import BaseModel
from datetime import datetime


class IncidentCreate(BaseModel):
    type_incident: str
    description: str | None = None
    localisation_dommage: str | None = None

class IncidentResponse(BaseModel):
    id: int
    porte_id: int
    type_incident: str
    description: str | None
    localisation_dommage: str | None

    priorite: str | None
    status: str | None
    source: str | None
    date_creation: datetime



    class Config:
        from_attributes = True