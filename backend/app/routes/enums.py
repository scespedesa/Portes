from fastapi import APIRouter 
from app.enums.type_incident  import TypeIncident
from app.enums.localisation import Localisation
from app.enums.priorite import Priorite
from app.enums.securite import Securite
from app.enums.statut import Statut
from app.enums.symptome import Symptome


router = APIRouter (
    prefix="/api/enums",
    tags=["Enums"]
)

@router.get("/type-incident")
def get_type_incident():
    return [e.value for e in TypeIncident]

@router.get("/localisation")
def get_localisation():
    return [e.value for e in Localisation]

@router.get("/priorite")
def get_priorite():
    return [e.value for e in Priorite]

@router.get("/securite")
def get_securite():
    return [e.value for e in Securite]

@router.get("/statut")
def get_statut():
    return [e.value for e in Statut]

@router.get("/symptome")
def get_symptome():
    return [e.value for e in Symptome]