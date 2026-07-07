from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class Batiment(Base):
    __tablename__ = "Batiments"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=True)

    portes = relationship("Porte",back_populates="batiment")
