from enum import Enum

class TypeIncident(str,Enum):
    DECHIRURE_TOILE = "Déchirure de la toile" 
    PERFORATION = "Perforation" 
    USURE = "Usure" 
    DESALIGNEMENT = "Désalignement" 
    DEFORMATION_GUIDES = "Déformation des guides latéraux" 
    SYSTEME_ENROULEMENT = "Problème du système d'enroulement"
    DEFAUT_MOTEUR = "Défaut moteur" 
    DEFAUT_CAPTEURS = "Défaut capteurs de sécurité" 
    NE_S_OUVRE_PAS = "La porte ne s'ouvre pas"
    NE_S_FERME_PAS = "La porte ne se ferme pas"
    AUTRE = "Autre"

