# conexion SQL
import pyodbc
import sqlite3
from config import serveur,basse_de_donnes,utilisateur , mot_de_passe , driver

def get_connexion():
    chaine_connexion = f"""
        DRIVER = {{driver}};
        SERVER = {{serveur}};
        DATABASE = {{basse_de_donnes}};
        UID= {{utilisateur}};
        PWD = {{mot_de_passe}};
        TrustServerCertificate = yes ;
    """

    # connexion = pyodbc.connect(chaine_connexion)
    connexion = sqlite3.connect(chaine_connexion)
    return connexion