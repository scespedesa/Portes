from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.sql import func
from database import Base


class Batiment(Base):
    __tablename__ = "Batiments"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True)
    description = Column(Text)


class Porte(Base):
    __tablename__ = "Portes"

    id = Column(Integer, primary_key=True, index=True)
    nb_serie = Column(String, unique=True)
    batiment_id = Column (Integer)
    description = Column(Text) 
    specifications = Column(Text)
    type_detection = Column(Text,default='BOUCLE')
    modele = Column(Text)
    largeur_cm = Column(Float)
    hauteur_cm = Column(Float)
    annee = Column(Integer)
    est_interieur = Column(Boolean)
    automate = Column(Boolean)
    voyant_sous_tension = Column(Boolean)
    voyant_defaut = Column(Boolean)
    condamme= Column(Boolean)
    freq_utilisation = Column(String(10))
    
    batiment_id = Column(Integer, ForeignKey("batiments.id"))


class Incident(Base):
    __tablename__ = "Incidents"

    id = Column(Integer, primary_key=True, index=True)
    porte_id = Column(Integer, ForeignKey("portes.id"))

    type_incident = Column(String)
    priorite = Column(String)
    description = Column(Text)
    code_erreur = Column(Text,default=None)
    localisation_dommage= Column(String(20))
    source = Column(String(20),default=None)

    date_creation = Column(DateTime(timezone=True), server_default=func.now())
    # revisar lo de la funcion timebatiment

class Diagnostic(Base):
    __tablename__ = "Diagnostics"
    id = Column(Integer,primary_key=True,index=True)
    porte_id = Column(Integer, ForeignKey("portes.id"))

    type_dommage = Column(Text)
    etat_ouverture = Column(String(10))
    etat_fermeture = Column(String(10))
    etat_securite = Column(String(10))
    etat_mode_auto =Column(String(10))
    etat_electrique =Column(String(10))
    etat_capteurs =Column(String(10))
    etat_anticollision=Column(String(10))
    defaut_moteur=Column(Boolean)
    blocage=Column(Boolean)
    vibrations=Column(Boolean)
    perte_etancheite=Column(Boolean)
    bruits=Column(Boolean)
    vitesse_reduite=Column(Boolean)
    decrochage_toile = Column(Boolean)
    date_creation = Column(DateTime(timezone=True), server_default=func.now())
    source = Column(String(50),default='Lora')

class Intervention(Base):
    __tablename__ = "Interventions"
    id = Column(Integer,primary_key=True,index=True)
    porte_id = Column(Integer, ForeignKey("portes.id"))

    date_realisation=Column(DateTime(timezone=True), server_default=func.now())
    devis=Column(Text)
    prix=Column(Float)
    capex_opex= Column(String(10))
    responsable=Column(String(100))

class Lora(Base):
    __tablename__ = "Lora"
    id = Column(Integer,primary_key=True,index=True)
    porte_id = Column(Integer, ForeignKey("portes.id"))

    status =  Column(String(10))
    