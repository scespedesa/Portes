from enum import Enum

class Priorite(str,Enum):
    FAIBLE = "Faible"
    MOYENNE = "Moyenne"
    HAUTE = "Haute"
    CRITIQUE = "Critique"