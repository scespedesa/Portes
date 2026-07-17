from enum import Enum

class UserRole(str,Enum):
    OPERATEUR = "Operateur"
    TECHNICIEN = "Technicien"
    ADMIN  = "Admin"
    INGENIEUR = "Ingénieur"
  