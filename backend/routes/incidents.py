from fastapi import APIRouter
from db import get_connexion

router = APIRouter(prefix="/incidents", tags=["Incidents"])


@router.post("")
def creer_incident(data: dict):
    conn = get_connexion()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Incidents (porte_id, type_incident, priorite, description, date_creation , code_erreur , localisation_dommage ,source)
        VALUES (?, ?, ?, ?)
    """,
    data["porte_id"],
    data["type_incident"],
    data["priorite"],
    data["description"],
    data["date_creation"],
    data["code_erreur"],
    data["localisation_dommage"],
    data["source"]
    )

    conn.commit()
    conn.close()

    return {"status": "ok"}