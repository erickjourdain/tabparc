import { User } from '@entity/*'
import { Statut } from '../database/entity/demande'
import { Opportunite } from './opportunite'

export interface DemandeOpp {
  id?: number
  codeOpp?: string
  client?: string
  codeClient?: number
  opportunite?: Opportunite | null
  statut?: Statut
  createur?: User
  gestionnaire?: User
  createdAt?: Date
  updatedAt?: Date
}
