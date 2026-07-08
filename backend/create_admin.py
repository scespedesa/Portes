from app.database import SessionLocal
from app.models.user import User
from app.auth.password import hash_password


db = SessionLocal()

admin = User ( 
    nom= 'Louis',
    email= "admin@portes.com",
    password_hash = hash_password("1234"),
    role=  "ADMIN",
    actif=True
)

db.add(admin)
db.commit()
db.refresh(admin)
db.close()