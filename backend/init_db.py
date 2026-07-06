from db import get_connexion
def initialiser_base():
    connexion = get_connexion()
    cursor = connexion.cursor()

    # Batiment
    cursor.execute("""
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Batiment')
    CREATE TABLE Batiment (
        batiment_id INT PRIMARY KEY IDENTITY(1,1),
        nom VARCHAR(100),
        description TEXT
    )
    """)

    # Portes
    # type (radar/boucle)
    # model nergeco/
    cursor.execute("""
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Portes')
    CREATE TABLE Portes (
        porte_id INT PRIMARY KEY IDENTITY(1,1),
        nb_serie VARCHAR(50) UNIQUE,
        batiment_id INT,
        description TEXT,
        specifications TEXT,
        modele TEXT,
        largeur_cm FLOAT,
        hauteur_cm FLOAT,
        est_interieur BOOLEAN,
        annee INT,
        type TEXT DEFAULT 'BOUCLE',
        automate BOOLEAN,
        voyant_sous_tension BOOLEAN,
        voyant_defaut BOOLEAN,
        condamme BOOLEAN,
        freq_utilisation VARCHAR(10),
        FOREIGN KEY (zone_id) REFERENCES Batiment(zone_id)
    )
    """)

    # INCIDENTS incidente
    # statut VARCHAR(20) DEFAULT 'OUVERT',
    # type dommage Déchirure de la toile / Perforation / usure / Désalignement / Déformation des guides latéraux / Problème du système d’enroulement / Défaut moteur / Défaut capteurs de sécurité / autre
    cursor.execute("""
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Incidents')
    CREATE TABLE Incidents (
        incident_id INT PRIMARY KEY IDENTITY(1,1),
        porte_id INT,
        type_incident VARCHAR(50),
        priorite VARCHAR(20),
        description TEXT,
        date_creation DATETIME DEFAULT GETDATE(),
        code_erreur TEXT DEFAULT 'NAN',
        localisation_dommage VARCHAR(20),   
        source VARCHAR(20) DEFAULT 'QR',
        FOREIGN KEY (porte_id) REFERENCES Portes(porte_id)
    )
    """)

    # DIAGNOSTICS
    # ouverture_status VARCHAR(10),
    cursor.execute("""
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Diagnostic')
    CREATE TABLE Diagnostic (
        diag_id INT PRIMARY KEY IDENTITY(1,1),
        porte_id INT,
        type_dommage TEXT,
        etat_ouverture VARCHAR(10),
        etat_fermeture VARCHAR(10),
        etat_securite VARCHAR(10),
        etat_mode_auto VARCHAR(10),
        etat_electrique VARCHAR(10),
        etat_capteurs VARCHAR(10),
        etat_anticollision VARCHAR(10),
        defaut_moteur BOOLEAN,
        blocage BOOLEAN,
        vibrations BOOLEAN,
        perte_etancheite BOOLEAN,
        bruits BOOLEAN,
        vitesse_reduite BOOLEAN,
        decrochage_toile BOOLEAN,
        timestamp DATETIME DEFAULT GETDATE(),
        source VARCHAR(20) DEFAULT 'LORA',
        FOREIGN KEY (porte_id) REFERENCES Portes(porte_id)
    )
    """)

    #Intervention
    cursor.execute("""
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Intervention')
    CREATE TABLE Intervention (
        intervention_id INT PRIMARY KEY IDENTITY(1,1),
        porte_id INT,
        date_realisation DATETIME DEFAULT GETDATE(),
        devis TEXT,
        prix FLOAT,
        capex_opex VARCHAR(10),
        responsable VARCHAR(100),
        FOREIGN KEY (porte_id) REFERENCES Portes(porte_id)
    )
    """)  

    #Lora
    cursor.execute("""
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Lora')
    CREATE TABLE Lora (
        lora_id INT PRIMARY KEY IDENTITY(1,1),
        porte_id INT,
        status VARCHAR(10),
        FOREIGN KEY (porte_id) REFERENCES Portes(porte_id)
    )
    """)                