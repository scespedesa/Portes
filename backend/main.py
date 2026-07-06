from fastapi import FastAPI
from database import engine, Base
import models

app = FastAPI()

# tables db created automatly
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Door system actif"}