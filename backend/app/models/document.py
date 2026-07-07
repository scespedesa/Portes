from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class Document(Base):
    __tablename__ = "Document"

    id = Column(Integer, primary_key=True, index=True)

    #porte_id = Column(Integer, ForeignKey("Portes.id"), nullable=False)
    #incident id
    #intervention id
    #chemin

