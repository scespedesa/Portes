from sqlalchemy import Column, Integer, String, Text , Boolean , DateTime
from sqlalchemy.sql import func


from app.database import Base

class User(Base):

    __tablename__ = "Users"

    id= Column(Integer,primary_key=True,index=True)
    nom = Column(String,nullable=False)
    email = Column(String(100), unique=True, index=True , nullable=False)
    password_hash= Column(String(250), unique=True, nullable=False)
    #admin , maintenance, superviseur , operateur , invite
    role = Column(Text, nullable=True)
    actif = Column(Boolean ,default= True )
    date_creation = Column(DateTime(timezone=True), server_default=func.now())
