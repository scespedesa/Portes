from enum import Enum

class Symptome(str,Enum):
    BLOCAGE = "Blocage"
    VIBRATIONS = "Vibrations"
    BRUITS = "Bruits"
    PERTE_ETANCHEITE = "Perte d'étanchéite"
    VITESSE_REDUITE = "Vitesse réduite"
    DECROCHAGE_TABLIER = "Décrochage du tablier"
