/* eslint-disable @typescript-eslint/no-explicit-any */
import { Opportunite } from './opportunite'
import { User } from './user'

export enum Statut {
  BROUILLON = <any>'0',
  ATTENTE_INFO_CLIENT = <any>'1',
  TRAITEMENT = <any>'2',
  ATTENTE_COMMANDE = <any>'3',
  PERDU = <any>'4',
  GAGNE = <any>'5'
}

export interface Demande {
  id: number
  opportunite: Opportunite
  codeClient: number
  client: string
  statut: Statut
  createur: User
  gestionnaire: User
  createdAt: Date
  updatedAt: Date
}
