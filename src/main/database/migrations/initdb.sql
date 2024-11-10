-- --------------------------------------------------------
-- Hôte:                         C:\Users\jourdain\Documents\Outils\Electron\data\tabparc.db
-- Version du serveur:           3.34.0
-- SE du serveur:                
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour tabparc
CREATE DATABASE IF NOT EXISTS "tabparc";
-- USE "tabparc" neither supported nor required;

-- Listage de la structure de la table tabparc. accreditation
CREATE TABLE IF NOT EXISTS "accreditation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reference" varchar NOT NULL, "valide" boolean NOT NULL DEFAULT (1), CONSTRAINT "UQ_96c66af1a1dcab2f3a235d839ac" UNIQUE ("reference"));

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table tabparc. contact
CREATE TABLE IF NOT EXISTS "contact" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nom" varchar NOT NULL, "prenom" varchar NOT NULL, "email" varchar NOT NULL, "telephone" varchar NOT NULL, "valide" boolean NOT NULL DEFAULT (1));

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table tabparc. demande
CREATE TABLE IF NOT EXISTS "demande" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "refOpportunite" varchar NOT NULL, "refProjet" varchar NOT NULL, "codeClient" integer NOT NULL, "client" varchar NOT NULL, "dateRetour" date, "dateSouhaitee" date, "statut" varchar CHECK( "statut" IN ('0','1','2','3','4','5') ) NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "createurId" integer, "gestionnaireId" integer, CONSTRAINT "UQ_54ac46c361d32a04d9b29e9f2ea" UNIQUE ("refOpportunite"), CONSTRAINT "FK_b73e5e2237c63f5b1593e85877b" FOREIGN KEY ("createurId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_ad061c0749db664958ede5e2eb0" FOREIGN KEY ("gestionnaireId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION);

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table tabparc. famille_instrument
CREATE TABLE IF NOT EXISTS "famille_instrument" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nom" varchar NOT NULL, "valide" boolean NOT NULL DEFAULT (1), CONSTRAINT "UQ_b30571348699495be2cf93a2988" UNIQUE ("nom"));

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table tabparc. grandeur
CREATE TABLE IF NOT EXISTS "grandeur" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nom" varchar NOT NULL, "accreditationId" integer, "lieuId" integer NOT NULL, CONSTRAINT "UQ_3020aee9e1333376c9a8f34a89c" UNIQUE ("nom"), CONSTRAINT "FK_5b178ab882a6442737a17e5058f" FOREIGN KEY ("accreditationId") REFERENCES "accreditation" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_dc9d4cbffc69a82fb29d2c3a0e2" FOREIGN KEY ("lieuId") REFERENCES "lieu" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION);

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table tabparc. grandeur_contacts_contact
CREATE TABLE IF NOT EXISTS "grandeur_contacts_contact" ("grandeurId" integer NOT NULL, "contactId" integer NOT NULL, CONSTRAINT "FK_aa73613ede4775802a75d2ce42e" FOREIGN KEY ("grandeurId") REFERENCES "grandeur" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_16e05e120fb39e5c69e4b44dcd5" FOREIGN KEY ("contactId") REFERENCES "contact" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("grandeurId", "contactId"));

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table tabparc. grandeur_instruments_famille_instrument
CREATE TABLE IF NOT EXISTS "grandeur_instruments_famille_instrument" ("grandeurId" integer NOT NULL, "familleInstrumentId" integer NOT NULL, CONSTRAINT "FK_eb3bb25719cc7472e8fbe821a7c" FOREIGN KEY ("grandeurId") REFERENCES "grandeur" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_0f5a913c6d4b4c95b2ca85aadfa" FOREIGN KEY ("familleInstrumentId") REFERENCES "famille_instrument" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("grandeurId", "familleInstrumentId"));

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table tabparc. instrument
CREATE TABLE IF NOT EXISTS "instrument" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "designation" varchar NOT NULL, "fabricant" varchar NOT NULL, "type" varchar NOT NULL, "numSerie" varchar NOT NULL, "refClient" varchar NOT NULL, "contact" varchar NOT NULL, "email" varchar NOT NULL, "telephone" varchar NOT NULL, "valide" boolean NOT NULL DEFAULT (1), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "numSerie_refClient" UNIQUE ("numSerie", "refClient"));

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table tabparc. lieu
CREATE TABLE IF NOT EXISTS "lieu" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "valide" boolean NOT NULL DEFAULT (1), "siteId" integer NOT NULL, "sectionId" integer NOT NULL, CONSTRAINT "site_section" UNIQUE ("siteId", "sectionId"), CONSTRAINT "FK_49891ddc68615dd7ddd1f7904e6" FOREIGN KEY ("siteId") REFERENCES "site" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_16a7dc9be09c9818902757b5b24" FOREIGN KEY ("sectionId") REFERENCES "section" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION);

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table tabparc. prestation
CREATE TABLE IF NOT EXISTS "prestation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "codeProduit" varchar NOT NULL, "libelle" text NOT NULL, "lebelleUBW" varchar NOT NULL, "quantite" int8 NOT NULL DEFAULT (1), "prixUnitaire" float NOT NULL DEFAULT (0));

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table tabparc. programme
CREATE TABLE IF NOT EXISTS "programme" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "precedenCE" text NOT NULL, "ptsMesures" text NOT NULL, "typePrestation" varchar CHECK( "typePrestation" IN ('0','1','2') ) NOT NULL DEFAULT (0), "emt" text NOT NULL, "periodicite" text NOT NULL, "dateSouhaite" date NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "instrumentId" integer, CONSTRAINT "FK_4575db11210cbe52efd0cd39e03" FOREIGN KEY ("instrumentId") REFERENCES "instrument" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION);

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table tabparc. section
CREATE TABLE IF NOT EXISTS "section" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reference" integer NOT NULL, "label" varchar NOT NULL, "valide" boolean NOT NULL DEFAULT (1));

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table tabparc. site
CREATE TABLE IF NOT EXISTS "site" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nom" varchar NOT NULL, "adresse" text NOT NULL, "telephone" varchar NOT NULL, "valide" boolean NOT NULL DEFAULT (1), CONSTRAINT "UQ_c81727f6ea1cbc32dc8f56f47a5" UNIQUE ("nom"));

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table tabparc. user
CREATE TABLE IF NOT EXISTS "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nom" varchar NOT NULL, "prenom" varchar NOT NULL, "login" varchar NOT NULL, "email" varchar NOT NULL, "titre" varchar NOT NULL, "telephone" varchar NOT NULL, "valide" boolean DEFAULT (1), "role" varchar CHECK( "role" IN ('ADMIN','COMMERCIAL','CHEF PROJET','ADV','READER') ) NOT NULL DEFAULT ('READER'), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"));

-- Les données exportées n'étaient pas sélectionnées.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
