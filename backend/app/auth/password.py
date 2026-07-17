from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt


from fastapi import Depends , HTTPException
from fastapi.security import HTTPBearer , HTTPAuthorizationCredentials

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User

security = HTTPBearer()

def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(security),

    db: Session = Depends(get_db)

):

    token = credentials.credentials

    payload = jwt.decode(

        token,

        SECRET_KEY,

        algorithms=[ALGORITHM]

    )

    user_id = int(payload["sub"])

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if user is None:

        raise HTTPException(
            status_code=401,
            detail="Utilisateur introuvable"
        )

    return user




ALGORITHM = "HS256"
ACESS_TOKEN_EXPIRE_MINUTES = 60
SECRET_KEY = "THE_KEY"

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password : str, hash_password : str):
    return pwd_context.verify(plain_password,hash_password)

def create_acess_token(data):
    to_encode = data.copy()
    expire =  datetime.now() + timedelta(minutes=ACESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({
        "exp" : expire
    })

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )




