import { UserRole, Statut, TypePrestation } from '@entity/*'

export { Statut, TypePrestation, UserRole }

export interface user {
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

export interface Lieu {
  id?: number
  site: Site
  section: Section
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
  contacts: Contact[]
  lieu: Lieu
  instruments: FamilleInstrument[]
}

export interface Instrument {
  id?: number
  designation: string
  fabricant: string | null
  type: string | null
  numSerie: string | null
  refClient: string | null
  contact: string | null
  email: string | null
  telephone: string | null
  valide: boolean
  createdAt: Date | null
  updatedAt: Date | null
  demandes: Demande[]
}

export interface Demande {
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
  instruments: Instrument[]
}

export interface Programme {
  id?: number
  precedentCE: string | null
  ptsMesures: string | null
  typePrestation: TypePrestation
  emt: string | null
  periodicite: string | null
  dateSouhaitee: string | null
  instrument: Instrument
  grandeur: Grandeur
  demande: Demande
  prestation: Prestation
  createdAt: Date
  updatedAt: Date
}

export interface Prestation {
  id?: number
  codeProduit: string
  libelle: string
  libelleUBW: string
  quantite: number
  prixUnitaire: number
}

export interface DataInstrument {
  date: Date | null
  client: string | null
  contact: string | null
  email: string | null
  telephone: string | null
  delaiDemande: Date | null
  instruments: Instrument[]
}
