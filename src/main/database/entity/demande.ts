import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user'
import { Instrument } from './instrument'

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

  @Column('int', { nullable: false, unique: true })
  codeClient?: number

  @Column('text', { nullable: false })
  client?: string

  @Column('date', { default: null })
  dateRetour?: Date

  @Column('date', { default: null })
  dateSouhaitee?: Date

  @Column({ type: 'int8', enum: Statut, default: Statut.BROUILLON })
  statut?: Statut

  @ManyToOne(() => User, { eager: true })
  createur!: User

  @ManyToOne(() => User, { eager: true })
  gestionnaire!: User

  @OneToMany(() => Instrument, (instrument) => instrument.demande)
  instruments!: Instrument[]

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
