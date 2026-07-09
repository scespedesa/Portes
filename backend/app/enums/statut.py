from enum import Enum

class Statut(str,Enum):
    NOUVEAU ="Nouveau"
    EN_DIAGNOSTIC = "En diagnostic"
    EN_INTERVENTION = "En intervention"
    TERMINE = "Terminé"
    FERME = "Fermé"