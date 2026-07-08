from app.auth.password import hash_password , verify_password

password = 'cou'

print(f"contra {password} ")
hased = hash_password(password)
print(verify_password(password,hased))

print(verify_password('quak',hased))