from fastapi import APIRouter
from db import get_connexion

router = APIRouter(prefix="/intervention", tags=["Intervention"])

@router.post("")
def add_lora(data:dict):
    conn = get_connexion()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Intervention (intervention_id, porte_id , date_realisation , devis , prix , capex_opex ,responsable)
        VALUES()
    """,
    data["intervention_id"],
    data["porte_id"],
    data["date_realisation"],
    data["devis"],
    data["prix"],
    data["capex_opex"],
    data["responsable"]
    )
    
    conn.commit()
    conn.close()

    return {"status" : "ok"}