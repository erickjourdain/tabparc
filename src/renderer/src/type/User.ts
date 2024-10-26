export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  READER = 'READER'
}

export interface User {
  id: number
  nom?: string
  prenom?: string
  login?: string
  email?: string
  role?: UserRole
  valide?: boolean
}
