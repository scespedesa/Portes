from fastapi import APIRouter
from db import get_connexion

router = APIRouter(prefix="/lora", tags=["Lora"])

@router.post("")
def add_lora(data:dict):
    conn = get_connexion()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Lora (lora_id, porte_id , status )
        VALUES()
    """,
    data["lora_id"],
    data["porte_id"],
    data["status"]
    )
    
    conn.commit()
    conn.close()

    return {"status" : "ok"}