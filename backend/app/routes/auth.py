from fastapi import APIRouter , Depends , HTTPException
from sqlalchemy.orm import Session
from app.schemas.auth import ( LoginRequest ,   TokenReponse)

from app.services.auth_service import authenticate_user
from app.models.user import User

from app.database import get_db
from app.auth.password import get_current_user

router = APIRouter(
    prefix="/api/auth",
    tags = ["Auth"]
)

@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "nom": current_user.nom,
        "role" : current_user.role,
        "actif" : current_user.actif
    }


@router.post("/login", response_model=TokenReponse)
def login(
    data: LoginRequest,
    db :Session = Depends ( get_db)
):
    token= authenticate_user(
        db,
        data.email,
        data.password
    )
    if not token:
        raise HTTPException(
            status_code=401,
            detail="Identifiants incorrets"
        )
    return {
        "access_token":token,
        "token_type":"bearer"
    }