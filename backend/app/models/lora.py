from sqlalchemy import Column, Integer, String, Boolean , ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Lora(Base):
    __tablename__ = "Loras"

    id = Column(Integer, primary_key=True, index=True)
    deveui = Column(String(100), unique=True, nullable=True)

    porte_id = Column(Integer, ForeignKey("Portes.id"), nullable=False)

    
    active = Column(Boolean,default=True)

    #RSSI ? SNR. DERNIERDONNE RECU 

    portes = relationship("Porte",back_populates="lora")
