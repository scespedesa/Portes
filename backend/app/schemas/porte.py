from pydantic import BaseModel


class PorteCreate(BaseModel):
    nom: str
    batiment_id : int
    description: str | None = None
    specifications : str | None = None
    type_detection : str 
    modele : str | None = None
    largeur_cm : float | None = None
    hauteur_cm : float | None = None
    annee : int | None = None
    exterieur_interieur : str
    automate : bool | None = None
    voyant_sous_tension : bool | None = None
    voyant_defaut : bool | None = None   
    condamne : bool | None = None
    freq_utilisation : str | None = None

class PorteResponse(BaseModel):
    id: int
    nom: str
    batiment_id: int
    description : str | None = None
    modele : str | None = None

    class Config:
        from_attributes = True