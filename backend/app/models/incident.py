from sqlalchemy import Column, JSON, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship

from app.models.diagnostic_incident import DiagnosticIncident
from sqlalchemy.sql import func

from app.database import Base

class Incident(Base):
    __tablename__ = "Incidents"

    id = Column(Integer, primary_key=True, index=True)

    porte_id = Column(Integer, ForeignKey("Portes.id"), nullable=False)


    # QR responses
    type_incident = Column(JSON, nullable=True)
    description = Column(Text)
    localisation_dommage = Column(String,default=None)
    
    # automatique
    priorite = Column(String(50),default=None)
    status = Column(String, default="OUVERT")
    source = Column(String, default="QR")
    date_creation = Column(DateTime(timezone=True), server_default=func.now())
    date_cloture= Column(DateTime(timezone=True), nullable=True)

    # blocage, vibrationes
    symptomes = Column(JSON, nullable=True)

    fonctionne_auto = Column(Boolean,default=True)
    fonctionne_manuel = Column(Boolean,default=True)

    niveau_degradation= Column(Integer,default=None)

    securite = Column(Text)


    porte = relationship("Porte", back_populates="incidents")
    diagnostic_incident = relationship("DiagnosticIncident", back_populates="incident",cascade="all, delete-orphan")

