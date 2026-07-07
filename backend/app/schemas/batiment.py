from pydantic import BaseModel


class BatimentCreate(BaseModel):
    nom: str
    description: str | None = None


class BatimentResponse(BaseModel):
    id: int
    nom: str
    description: str | None = None

    class Config:
        from_attributes = True