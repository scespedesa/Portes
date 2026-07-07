from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship

from app.database import Base



class Porte(Base):
    __tablename__ = "Portes"

    id = Column(Integer, primary_key=True, index=True)

    nom = Column(String(10), unique=True, index=True)

    batiment_id = Column(Integer, ForeignKey("Batiments.id"),nullable=False)
    batiment = relationship("Batiment",back_populates="portes")

    lora = relationship("Lora",back_populates="portes",cascade="all, delete-orphan")

    incidents = relationship("Incident",back_populates="porte")

    diagnostics = relationship("Diagnostic", back_populates="porte")

    interventions = relationship("Intervention", back_populates="porte")

    description = Column(Text)
    specifications = Column(Text)

    type_detection = Column(String, default="BOUCLE")
    modele = Column(String)

    largeur_cm = Column(Float)
    hauteur_cm = Column(Float)

    annee = Column(Integer)

    exterieur_interieur = Column(String, default="EXTERIEUR")
    automate = Column(Boolean, default=None)

    voyant_sous_tension = Column(Boolean, default=None)
    voyant_defaut = Column(Boolean, default=None)

    condamne = Column(Boolean, default=None)

    freq_utilisation = Column(String(10))


