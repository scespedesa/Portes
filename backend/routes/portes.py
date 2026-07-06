from fastapi import APIRouter
from db import get_connexion

router = APIRouter(prefix="/portes", tags=["portes"])


@router.get("/")
def get_portes():
    connexion = get_connexion()
    cursor = connexion.cursor()

    cursor.execute("SELECT * FROM portes")
    result = cursor.fetchall()

    connexion.close()

    return {"portes": [list(row) for row in result]}