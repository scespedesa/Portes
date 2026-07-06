from fastapi import FastAPI , Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLReponse
from db import get_conexion
app = FastAPI()

templates = Jinja2Templates(directoty="templates")

from routes import incidents,portes,diagnostic,intervention,lora
app.include_router(incidents.router)
app.include_router(portes.router)
app.include_router(diagnostic.router)
app.include_router(intervention.router)
app.include_router(lora.router)

@app.get("/")
def home():
    return {"message": "Backend du systeme portes actif"}

def page_report(request: Request, porte: str):
    return templates.TemplateResponse(
        "report.html",
        {
            "request": request,
            "porte": porte
        }
    )

# @app.get("/init-db")
# def init_db():
#     initialiser_base()
#     return {"message":"Basse de données initialisé avec succès"}
