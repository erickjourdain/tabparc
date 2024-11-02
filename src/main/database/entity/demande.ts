import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user'

export enum Statut {
  BROUILLON = 0,
  ATTENTE_INFO_CLIENT = 1,
  TRAITEMENT = 2,
  ATTENTE_COMMANDE = 3,
  PERDU = 4,
  GAGNE = 5
}

@Entity()
export class Demande {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { nullable: false, unique: true })
  refOpportunite!: string

  @Column({ type: 'int8', enum: Statut, default: Statut.BROUILLON })
  statut?: Statut

  @ManyToOne(() => User, { eager: true })
  createur!: User

  @ManyToOne(() => User, { eager: true })
  gestionnaire!: User

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
