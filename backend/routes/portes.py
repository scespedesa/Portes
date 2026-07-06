from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models import Porte

router = APIRouter()
templates = Jinja2Templates(directory="templates")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/portes")
def liste_portes(request: Request, db: Session = Depends(get_db)):
    portes = db.query(Porte).all()
    return templates.TemplateResponse(
        "portes.html",
        {
            "request": request,
            "portes": portes
        }
    )

# @router.get("/portes", response_class=HTMLResponse)
# def liste_portes(request: Request, db: Session = Depends(get_db)):

#     portes = db.query(Porte).all()

#     return templates.TemplateResponse(
#         "portes.html",
#         {
#             "request": request,
#             "portes": portes
#         }
#     )