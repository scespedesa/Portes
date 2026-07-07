from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base


class DiagnosticIncident(Base):

    __tablename__ = "DiagnosticIncident"

    id =  Column(Integer, primary_key=True, index=True)

    diagnostic_id = Column(Integer,ForeignKey("Diagnostics.id"),nullable=False)
    incident_id = Column(Integer,ForeignKey("Incidents.id"),nullable=False)

    #date_liason

    diagnostic = relationship("Diagnostic", back_populates="diagnostic_incident")

    incident = relationship("Incident", back_populates="diagnostic_incident")