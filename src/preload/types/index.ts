export enum UserRole {
  ADMIN = 'ADMIN',
  COMMERCIAL = 'COMMERCIAL',
  CHEF_PROJET = 'CHEF PROJET',
  ADV = 'ADV',
  READER = 'READER'
}

export enum Statut {
  BROUILLON = 0,
  ATTENTE_INFO_CLIENT = 1,
  TRAITEMENT = 2,
  ATTENTE_COMMANDE = 3,
  PERDU = 4,
  GAGNE = 5
}

export enum TypePrestation {
  ETALONNAGE = 0,
  VERIFICATION = 1,
  ETALONNAGE_VERIFICATOION = 2
}

export interface User {
  id?: number
  nom: string
  prenom: string
  login: string
  email: string
  titre: string
  telephone: string
  valide: boolean
  role: UserRole
}

export interface Contact {
  id?: number
  nom: string
  prenom: string
  email: string
  telephone: string
  valide: boolean
}

export interface Section {
  id?: number
  reference: number
  label?: string
  valide: boolean
}

export interface Site {
  id?: number
  nom: string
  adresse?: string
  telephone?: string
  valide: boolean
}

export interface Accreditation {
  id?: number
  reference: string
  valide: boolean
}

export interface FamilleInstrument {
  id?: number
  nom: string
  valide: boolean
}

export interface Grandeur {
  id?: number
  nom: string
  accreditation: Accreditation | null
  valide: boolean
  contacts: Contact[]
  section: Section
  site: Site
  instruments: FamilleInstrument[]
}

export interface Instrument {
  id?: number
  designation: string
  fabricant: string | null
  modele: string | null
  numSerie: string | null
  refClient: string | null
  refLNE: string | null
  codeClient: number
  contact: string | null
  email: string | null
  telephone: string | null
  valide: boolean
  createdAt: Date | null
  updatedAt: Date | null
  besoins: Besoin[]
}

export interface Opportunite {
  id?: number
  refOpportunite: string
  refProjet: string | null
  codeClient: number
  client: string
  dateRetour: Date | null
  dateSouhaitee: Date | null
  statut: Statut
  createur: User
  gestionnaire: User
  createdAt: Date | null
  updatedAt: Date | null
  demande: EnteteDemande | null
  besoins: Besoin[]
}

export interface Besoin {
  id?: number
  designation: string
  fabricant: string | null
  modele: string | null
  numSerie: string | null
  refClient: string | null
  grandeur: string | null
  precedentCE: string | null
  ptsMesures: string | null
  typePrestation: string | null
  emt: string | null
  periodicite: string | null
  dateSouhaitee: string | null
  contact: string | null
  email: string | null
  telephone: string | null
  opportunite: Opportunite
  instrument: Instrument
  prestation: Prestation
  createdAt: Date | null
  updatedAt: Date | null
}

export interface Prestation {
  id?: number
  codeProduit: string
  libelle: string
  libelleUBW: string
  quantite: number
  prixUnitaire: number
}

export interface OpportuniteCRM {
  code: number
  reference: string
  titre: string
  dateCreation: Date
  client: string
  codeClient: number
  contactNom: string
  contactPrenom: string
  contactTelephone: string
  contactVille: string
  contactPays: string
  contactEmail: string
  statut: string
}

export interface Demande {
  id?: number
  numLigne: number
  designation: string
  fabricant: string | null
  modele: string | null
  numSerie: string | null
  refClient: string | null
  grandeur: string | null
  precedentCE: string | null
  ptsMesures: string | null
  typePrestation: string | null
  emt: string | null
  periodicite: string | null
  dateSouhaitee: Date | null
  contact: string | null
  email: string | null
  telephone: string | null
}

export interface EnteteDemande {
  id?: number
  fichier: string
  date: Date | null
  client: string | null
  contact: string | null
  email: string | null
  telephone: string | null
  dateSouhaitee: Date | null
  demandes: Demande[]
}
