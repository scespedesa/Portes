from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base
from sqlalchemy.orm import relationship

class Diagnostic(Base):
    __tablename__ = "Diagnostics"

    id = Column(Integer, primary_key=True, index=True)

    porte_id = Column(Integer, ForeignKey("Portes.id"), nullable=False)

    intervention_id = Column(Integer, ForeignKey("Interventions.id"), nullable=True)

    intervention = relationship("Intervention", back_populates="diagnostics")

    type_dommage = Column(Text)

    commentaire = Column(Text, default=None)

    # Automatique_lora, inspection_periodique, suite_incident , maintenance
    source = Column(String(50), default = "INSPECTION")

    responsable = Column(String(50), default = "DEP_MAINTENANCE")

    validation_technicien = Column(Boolean, default=False)
    date_validation = Column(DateTime(timezone=True))
    budget = Column(Float, default=None)

    # recommandation
    # cause_probable
    #budget

    # Resultats du diagnostic

    etat_ouverture = Column(String(10))
    etat_fermeture = Column(String(10))
    etat_securite = Column(String(10))
    etat_mode_auto = Column(String(10))
    etat_electrique = Column(String(10))
    etat_capteurs = Column(String(10))
    etat_anticollision = Column(String(10))


    # defauts observes

    defaut_moteur = Column(Boolean, default=False)
    blocage = Column(Boolean, default=False)
    vibrations = Column(Boolean,default=False)
    perte_etancheite = Column(Boolean,default=False)
    bruits = Column(Boolean,default=False)
    vitesse_reduite = Column(Boolean,default=False)
    decrochage_toile = Column(Boolean,default=False)


    date_creation = Column(DateTime(timezone=True), server_default=func.now())

    porte = relationship("Porte", back_populates="diagnostics")

    diagnostic_incident = relationship("DiagnosticIncident", back_populates="diagnostic",cascade="all, delete-orphan")

    analyses = relationship("Analyse",back_populates="diagnostic", cascade= "all, delete-orphan")

    