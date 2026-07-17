from datetime import datetime
from app.models.incident import Incident
def create_incident(db, porte_id , incident):
    #_validate(incident)
    #priorite
    statut = "NOUVEAU"

    incident = _validate_localisation(incident)

    if  "AUTRE" in incident.type_incident : 
        incident.type_incident.remove("AUTRE")
    
    fonction_manu = True
    fonction_auto = True

    match incident.fonctionne_auto :
        case "PARTIELLEMENT" :
            fonction_auto= False
        case "OUI" :
            fonction_auto = True
        case "NON" :
            fonction_auto = False

    match incident.fonctionne_manuel :
        case "PARTIELLEMENT" :
            fonction_manu= False
        case "OUI" :
            fonction_manu = True
        case "NON" :
            fonction_manu = False
    


    nouveau_incident = Incident(
        porte_id= porte_id,
        type_incident=incident.type_incident,
        description=incident.description,  
        localisation_dommage = incident.localisation_dommage,
        symptomes = incident.symptomes,
        fonctionne_auto = fonction_auto,
        fonctionne_manuel = fonction_manu,
        securite = incident.securite,
        niveau_degradation = incident.niveau_degradation,
    )
    db.add(nouveau_incident)
    db.commit()
    db.refresh(nouveau_incident)
    return nouveau_incident


def _validate_localisation(incident):
    if incident.autre_localisation :
        incident.localisation = incident.autre_localisation
    return incident
    
#def _validate(incident):

