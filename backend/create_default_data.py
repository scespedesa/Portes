from app.database import SessionLocal
from app.models.batiment import Batiment
from app.models.porte import Porte


db = SessionLocal()

def into_db(object):
    db.add(object)
    db.commit()
    db.refresh(object)

def new_batiment(nom,description):
    batiment = Batiment(nom = nom, description = description)
    into_db(batiment)

def new_porte(nom,batiment_id,description,specifications,type_detection,modele,largeur_cm, hauteur_cm,
                  annee,exterieur_interieur,automate,voyant_sous_tension,
                  voyant_defaut, condamne, freq_utilisation):
    porte = Porte( nom , batiment_id , description, specifications,
                  type_detection,modele,largeur_cm, hauteur_cm,
                  annee,exterieur_interieur,automate,voyant_sous_tension,
                  voyant_defaut, condamne, freq_utilisation )
    into_db(porte)


batiment = Batiment(nom = "Tolerie", description = "Batiment MCA")
db.add(batiment)
db.commit()
db.refresh(batiment)
# new_batiment("Tolerie","Batiment MCA")
# new_batiment("Montage","Batiment MCA")
# new_batiment("Emboutissage","Batiment MCA")
# new_batiment("Magasin","Batiment MCA")
# new_porte("T1",1,"Porte Nord Lora",
#           "Porte souple rapide industrielle pour zone logistique",
#           "Boucle","Nergeco",400,450,
#           2020,"Exterieur",False,True,
#           True,False,"Forte")

# new_porte("T2",2,"Porte Quai Expedition",
#           "Porte souple rapide pour quai d'expedition poids lourds",
#           "Boucle","Nergeco",450,500,
#           2019,"Exterieur",False,True,
#           True,False,"Tres forte")

# new_porte("T3",3,"Porte Reception Marchandises",
#           "Porte industrielle a enroulement rapide",
#           "Boucle","Nergeco",400,450,
#           2021,"Exterieur",False,True,
#           True,False,"Tres forte")

# new_porte("T4",4,"Porte Acces Production",
#           "Porte souple rapide de separation des zones de production",
#           "Boucle","Nergeco",350,400,
#           2018,"Interieur",False,True,
#           True,False,"Moyenne")

# new_porte("T5",5,"Porte Sortie Logistique",
#           "Porte industrielle rapide pour circulation chariots elevateurs",
#           "Boucle","Nergeco",450,500,
#           2022,"Exterieur",False,True,
#           True,False,"Forte")

# new_porte("T6",6,"Porte Zone Stockage",
#           "Porte rapide industrielle pour entrepot de stockage",
#           "Boucle","Nergeco",350,450,
#           2023,"Interieur",False,True,
#           True,False,"Forte")



db.close()