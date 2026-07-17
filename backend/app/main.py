from fastapi import FastAPI
from app.database import Base , engine
from app.routes import batiments , portes , incidents , diagnostics , analyses , loras , enums , auth
from app.models.batiment import Batiment
from app.models.porte import Porte
from app.models.incident import Incident
from app.models.diagnostic import Diagnostic
from app.models.diagnostic_incident import DiagnosticIncident
from app.models.intervention import Intervention
from app.models.analyse import Analyse
from app.models.lora import Lora
from app.models.user import User


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware



Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portes Industrielles MCA")

#CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(batiments.router)
app.include_router(portes.router)
app.include_router(incidents.router)
app.include_router(diagnostics.router)
app.include_router(analyses.router)
app.include_router(loras.router)
app.include_router(enums.router)
app.include_router(auth.router)


@app.get("/api/health")
def health():
    return {
        "status":"OK",
        "message": "Door system actif"}