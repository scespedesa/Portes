from fastapi import FastAPI
from backend.database import engine, Base
from backend.routes import batiments ,qr, incidents, portes, dashboard , accueil , auth , diagnostics , interventions , lora 

app = FastAPI(title="Portes Industrielles MCA")

# tables db created automatly , BD SE CREA ACA
Base.metadata.create_all(bind=engine)

app.include_router(qr.router)
app.include_router(incidents.router)
app.include_router(portes.router)
app.include_router(dashboard.router)
app.include_router(batiments.router)
app.include_router(accueil.router)
app.include_router(auth.router)
app.include_router(diagnostics.router)
app.include_router(interventions.router)
app.include_router(auth.router)


@app.get("/")
def home():
    return {
        "status":"OK",
        "message": "Door system actif"}