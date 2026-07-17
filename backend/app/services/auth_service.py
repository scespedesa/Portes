from app.auth.password import verify_password , create_acess_token
from app.models.user import User

def authenticate_user(
        db,
        username,
        password
):
    user= (
        db.query(User).filter(User.nom==username).first()
    )
    if not user:
        return None
    
    if not verify_password( password , user.password_hash):
        return None
    
    token= create_acess_token({
        "sub" : str(user.id),
        "role": user.role
    })


    return token
