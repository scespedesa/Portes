from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from app.database import Base
from sqlalchemy.orm import relationship

class Intervention(Base):
    __tablename__ = "Interventions"

    id = Column(Integer, primary_key=True, index=True)

    porte_id = Column(Integer, ForeignKey("Portes.id"), nullable=False)

    responsable = Column(String(50), default = "DEP_MAINTENANCE")



    prix = Column(Float,default=None)

    capex_opex = Column(String(50), default=None)

    description = Column(String, default=None)

    pieces_changees = Column(Text, default=None)

    date_debut= Column(DateTime(timezone=True))

    date_fin = Column(DateTime(timezone=True),default=None)

    resultat = Column(Text,default=None)

    garantie = Column(String,default=None)

    diagnostics = relationship("Diagnostic",back_populates="intervention")

    porte = relationship("Porte", back_populates="interventions")

