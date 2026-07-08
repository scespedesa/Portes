from app.database import SessionLocal
from app.models.user import User

db = SessionLocal()

users= db.query(User).all()

for user in users :
    print(user.nom,user.email,user.password_hash, user.role)

db.close()