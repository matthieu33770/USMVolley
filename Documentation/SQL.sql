#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: Role
#------------------------------------------------------------

CREATE TABLE Role(
        id_role  Int  Auto_increment  NOT NULL ,
        fonction Varchar (50) NOT NULL
	,CONSTRAINT Role_PK PRIMARY KEY (id_role)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Equipe
#------------------------------------------------------------

CREATE TABLE Equipe(
        id_equipe      Int  Auto_increment  NOT NULL ,
        libelle_equipe Varchar (255) NOT NULL
	,CONSTRAINT Equipe_PK PRIMARY KEY (id_equipe)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Licence
#------------------------------------------------------------

CREATE TABLE Licence(
        id_licence        Int  Auto_increment  NOT NULL ,
        prix              Double NOT NULL ,
        categorie         Varchar (10) NOT NULL ,
        formulaire        Varchar (255) NOT NULL ,
        certificatMedical Varchar (255) NOT NULL ,
        paye              Bool NOT NULL
	,CONSTRAINT Licence_PK PRIMARY KEY (id_licence)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Joueur
#------------------------------------------------------------

CREATE TABLE Joueur(
        id_joueur      Int  Auto_increment  NOT NULL ,
        nom            Varchar (100) NOT NULL ,
        prenom         Varchar (100) NOT NULL ,
        numero_adresse Int NOT NULL ,
        rue            Varchar (255) NOT NULL ,
        code_postal    Int NOT NULL ,
        ville          Varchar (100) NOT NULL ,
        mail           Varchar (255) NOT NULL ,
        telephone_1    Varchar (10) NOT NULL ,
        telephone_2    Varchar (10) NOT NULL ,
        date_naissance Date NOT NULL ,
        username       Varchar (100) NOT NULL
	,CONSTRAINT Joueur_PK PRIMARY KEY (id_joueur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: User
#------------------------------------------------------------

CREATE TABLE User(
        id_user   Int  Auto_increment  NOT NULL ,
        mdp       Varchar (50) NOT NULL ,
        id_role   Int NOT NULL ,
        id_joueur Int NOT NULL
	,CONSTRAINT User_PK PRIMARY KEY (id_user)

	,CONSTRAINT User_Role_FK FOREIGN KEY (id_role) REFERENCES Role(id_role)
	,CONSTRAINT User_Joueur0_FK FOREIGN KEY (id_joueur) REFERENCES Joueur(id_joueur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Agenda
#------------------------------------------------------------

CREATE TABLE Agenda(
        id_agenda Int  Auto_increment  NOT NULL ,
        libelle   Varchar (255) NOT NULL ,
        lieu      Varchar (255) NOT NULL ,
        date      Date NOT NULL ,
        heure     Time NOT NULL ,
        equipe    Varchar (50) NOT NULL ,
        statut    Varchar (50) NOT NULL
	,CONSTRAINT Agenda_PK PRIMARY KEY (id_agenda)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Appartenir
#------------------------------------------------------------

CREATE TABLE Appartenir(
        id_equipe Int NOT NULL ,
        id_joueur Int NOT NULL
	,CONSTRAINT Appartenir_PK PRIMARY KEY (id_equipe,id_joueur)

	,CONSTRAINT Appartenir_Equipe_FK FOREIGN KEY (id_equipe) REFERENCES Equipe(id_equipe)
	,CONSTRAINT Appartenir_Joueur0_FK FOREIGN KEY (id_joueur) REFERENCES Joueur(id_joueur)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Avoir
#------------------------------------------------------------

CREATE TABLE Avoir(
        id_licence Int NOT NULL ,
        id_joueur  Int NOT NULL ,
        annee      Int NOT NULL ,
        isValide   Bool NOT NULL
	,CONSTRAINT Avoir_PK PRIMARY KEY (id_licence,id_joueur)

	,CONSTRAINT Avoir_Licence_FK FOREIGN KEY (id_licence) REFERENCES Licence(id_licence)
	,CONSTRAINT Avoir_Joueur0_FK FOREIGN KEY (id_joueur) REFERENCES Joueur(id_joueur)
)ENGINE=InnoDB;

