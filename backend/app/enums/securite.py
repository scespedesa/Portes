from enum import Enum

class Securite(str,Enum):
    OUI = "Oui"
    AVEC_PRECAUTION = "Avec précaution"
    NON = "Non"
