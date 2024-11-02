export enum UserRole {
  ADMIN = 'ADMIN',
  COMMERCIAL = 'COMMERCIAL',
  CHEF_PROJET = 'CHEF PROJET',
  ADV = 'ADV',
  READER = 'READER'
}

export interface User {
  id: number
  nom?: string
  prenom?: string
  login?: string
  email?: string
  role?: UserRole
  titre?: string
  telephone?: string
  valide?: boolean
}
