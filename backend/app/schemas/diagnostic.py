from pydantic import BaseModel
from datetime import datetime


class DiagnosticCreate(BaseModel):
    porte_id: str
    source: str = "INSPECTION"

    etat_ouverture : str | None=None
    etat_fermeture: str | None = None
    etat_securite: str | None = None
    etat_mode_auto: str | None = None
    etat_electrique: str | None = None
    etat_capteurs: str | None = None
    etat_anticollision: str | None = None

    defaut_moteur: bool = False
    blocage: bool = False
    vibrations: bool = False
    perte_etancheite: bool = False
    bruits: bool = False
    vitesse_reduite: bool = False
    decrochage_toile: bool = False

    commentaire: str | None=None
    responsable: str | None=None
    validation_technicien : bool = False

    budget : float | None = None
    date_validation : datetime | None=None



class DiagnosticResponse(BaseModel):
    id: int
    date_creation: datetime

    class Config:
        from_attributes = True