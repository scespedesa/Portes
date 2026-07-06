# backend/models.py

from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.sql import func
from backend.database import Base


# =========================
# BÂTIMENT
# =========================
class Batiment(Base):
    __tablename__ = "batiments"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True)
    description = Column(Text)


# =========================
# PORTE
# =========================
class Porte(Base):
    __tablename__ = "portes"

    id = Column(Integer, primary_key=True, index=True)

    code_porte = Column(String, unique=True, index=True)

    batiment_id = Column(Integer, ForeignKey("batiments.id"))

    description = Column(Text)
    specifications = Column(Text)

    type_detection = Column(String, default="BOUCLE")
    modele = Column(String)

    largeur_cm = Column(Float)
    hauteur_cm = Column(Float)

    annee = Column(Integer)

    est_interieur = Column(Boolean)
    automate = Column(Boolean)

    voyant_sous_tension = Column(Boolean)
    voyant_defaut = Column(Boolean)

    condamnee = Column(Boolean)

    freq_utilisation = Column(String(10))

    fabricant = Column(String)
    numero_serie = Column(String)


# =========================
# INCIDENT
# =========================
class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    porte_id = Column(Integer, ForeignKey("portes.id"))

    type_incident = Column(String)
    priorite = Column(String)

    description = Column(Text)

    code_erreur = Column(String, nullable=True)
    localisation_dommage = Column(String, nullable=True)

    source = Column(String, default="MANUEL")

    statut = Column(String, default="OUVERT")

    date_creation = Column(DateTime(timezone=True), server_default=func.now())


# =========================
# DIAGNOSTIC
# =========================
class Diagnostic(Base):
    __tablename__ = "diagnostics"

    id = Column(Integer, primary_key=True, index=True)

    porte_id = Column(Integer, ForeignKey("portes.id"))

    type_dommage = Column(Text)

    etat_ouverture = Column(String(10))
    etat_fermeture = Column(String(10))
    etat_securite = Column(String(10))
    etat_mode_auto = Column(String(10))
    etat_electrique = Column(String(10))
    etat_capteurs = Column(String(10))
    etat_anticollision = Column(String(10))

    defaut_moteur = Column(Boolean)
    blocage = Column(Boolean)
    vibrations = Column(Boolean)
    perte_etancheite = Column(Boolean)
    bruits = Column(Boolean)
    vitesse_reduite = Column(Boolean)
    decrochage_toile = Column(Boolean)

    source = Column(String(50), default="LORA")

    date_creation = Column(DateTime(timezone=True), server_default=func.now())


# =========================
# INTERVENTION
# =========================
class Intervention(Base):
    __tablename__ = "interventions"

    id = Column(Integer, primary_key=True, index=True)

    incident_id = Column(Integer, ForeignKey("incidents.id"))
    porte_id = Column(Integer, ForeignKey("portes.id"))

    date_realisation = Column(DateTime(timezone=True), server_default=func.now())

    devis = Column(Text)
    prix = Column(Float)

    capex_opex = Column(String(10))
    responsable = Column(String(100))


# =========================
# LORA
# =========================
class Lora(Base):
    __tablename__ = "lora"

    id = Column(Integer, primary_key=True, index=True)

    porte_id = Column(Integer, ForeignKey("portes.id"))

    status = Column(String(20))

    date_reception = Column(DateTime(timezone=True), server_default=func.now())