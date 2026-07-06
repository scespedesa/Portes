from fastapi import APIRouter
from db import get_connexion

router = APIRouter(prefix="/diagnostic", tags=["Diagnostic"])


@router.post("/")
def add_diag(data: dict):
    connexion = get_connexion()
    cursor = connexion.cursor()

    cursor.execute("""
        INSERT INTO Diagnostic
        (porte_id,type_dommage,etat_ouverture , etat_fermeture , etat_securite, 
                   etat_mode_auto, etat_electrique , etat_capteurs,
                   etat_anticollision , defaut_moteur , blocage , 
                   vibrations,perte_etancheite, bruits , vitesse_reduite , 
                   decrochage_toile , timestamp , source )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """,
    data["porte_id"],
    data["type_dommage"],
    data["etat_ouverture"],
    data["etat_fermeture"],
    data["etat_securite"],
    data["etat_securite"],
    data["etat_mode_auto"],
    data["etat_electrique"],
    data["etat_capteurs"],
    data["etat_anticollision"],
    data["defaut_moteur"],
    data["blocage"],
    data["vibrations"],
    data["perte_etancheite"],
    data["bruits"],
    data["vitesse_reduite"],
    data["decrochage_toile"],
    data["timestamp"],
    data["source"]
    )


    connexion.commit()
    connexion.close()

    return {"message": "Diagnostic ajouté"}