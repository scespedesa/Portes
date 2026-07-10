from fastapi import APIRouter 
from app.enums.type_incident  import TypeIncident
from app.enums.localisation import Localisation
from app.enums.priorite import Priorite
from app.enums.securite import Securite
from app.enums.statut import Statut
from app.enums.symptome import Symptome
from app.enums.etat import Etat


router = APIRouter (
    prefix="/api/enums",
    tags=["Enums"]
)


def enum_to_list(classe):
    return [{"value": e.name , "label" : e.value }  for e in classe ]



@router.get("/type-incident")
def get_type_incident():
    #[{"value": e.name , "label" : e.value }  for e in TypeIncident ]
    # [e.value for e in TypeIncident]
    return  enum_to_list(TypeIncident)

@router.get("/localisation")
def get_localisation():
    return enum_to_list(Localisation)

@router.get("/priorite")
def get_priorite():
    return enum_to_list(Priorite)

@router.get("/securite")
def get_securite():
    return enum_to_list(Securite)

@router.get("/statut")
def get_statut():
    return enum_to_list(Statut)

@router.get("/symptome")
def get_symptome():
    return enum_to_list(Symptome)

@router.get("/etat")
def get_etat():
    return enum_to_list(Etat)