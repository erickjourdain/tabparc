import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user.entity'
import { Instrument } from './instrument.entity'

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

  @Column('varchar', { nullable: false, unique: true })
  refOpportunite!: string

  @Column('varchar')
  refProjet?: string

  @Column('int', { nullable: false })
  codeClient!: number

  @Column('varchar', { nullable: false })
  client!: string

  @Column('date', { default: null })
  dateRetour?: Date

  @Column('date', { default: null })
  dateSouhaitee?: Date

  @Column({ type: 'int8', enum: Statut, default: Statut.BROUILLON, nullable: false })
  statut!: Statut

  @ManyToOne(() => User, { eager: true })
  createur!: User

  @ManyToOne(() => User, { eager: true })
  gestionnaire!: User

  @ManyToMany(() => Instrument)
  instruments!: Instrument[]

  @CreateDateColumn({ nullable: false })
  createdAt?: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt?: Date
}
