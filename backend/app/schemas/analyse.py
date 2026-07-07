from pydantic import BaseModel
from datetime import datetime


class AnalyseCreate(BaseModel):
    responsable : str | None = None
    cause_probable: str | None = None
    recommendation: str | None = None
    priorite: str | None = None

class AnalyseResponse(BaseModel):
    id: int
    diagnostic_id: int
    date_analyse: datetime



    class Config:
        from_attributes = True 