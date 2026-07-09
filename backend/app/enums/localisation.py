from enum import Enum

class Localisation(str,Enum):
    TOILE= "Toile"
    GUIDES = "Guides"
    AXE= "Axe"
    MOTEUR = "Moteur"
    CAPTEURS = "Capteurs"
    COFFRET = "Coffret électrique"
    COMMANDE = "Commande"
    AUTRE =  "Autre"
