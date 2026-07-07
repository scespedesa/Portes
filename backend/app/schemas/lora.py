from pydantic import BaseModel


class LoraCreate(BaseModel):
    deveui: str
    active: bool = True


class LoraResponse(BaseModel):
    id: int
    deveui: str

    class Config:
        from_attributes = True