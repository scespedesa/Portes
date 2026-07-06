from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models import Batiment

router = APIRouter()
templates = Jinja2Templates(directory="templates")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/batiments", response_class=HTMLResponse)
def liste_batiments(request: Request, db: Session = Depends(get_db)):

    batiments = db.query(Batiment).all()

    return templates.TemplateResponse(
        "batiments.html",
        {
            "request": request,
            "batiments": batiments
        }
    )
