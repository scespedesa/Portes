from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base
from sqlalchemy.orm import relationship

class Analyse(Base):
    __tablename__ = "Analyses"

    id = Column(Integer, primary_key=True, index=True)

    diagnostic_id = Column(Integer, ForeignKey("Diagnostics.id"), nullable=False)

    #version

    responsable = Column(String(50), default = "DEP_MAINTENANCE")

    cause_probable = Column(String, default=None,nullable=True )

    priorite = Column(String(50),default=None)

    recommendation = Column(String(50),default=None , nullable=True)

    date_analyse= Column(DateTime(timezone=True), server_default=func.now())


    diagnostic = relationship("Diagnostic", back_populates="analyses")
