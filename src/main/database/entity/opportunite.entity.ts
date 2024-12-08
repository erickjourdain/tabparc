import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user.entity'
import { Statut } from '@apptypes/'
import { Besoin } from './besoin.entity'
import { EnteteDemande } from './enteteDemande.entity'

@Entity()
export class Opportunite {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('varchar', { nullable: false, unique: true })
  refOpportunite!: string

  @Column('varchar', { default: null })
  refProjet?: string

  @Column('int', { nullable: false })
  codeClient!: number

  @Column('varchar', { nullable: false })
  client!: string

  @Column('date', { nullable: true, default: null })
  dateRetour?: Date

  @Column('date', { nullable: true, default: null })
  dateSouhaitee?: Date

  @Column({ type: 'enum', enum: Statut, default: Statut.BROUILLON, nullable: false })
  statut?: Statut

  @ManyToOne(() => User, { eager: true })
  createur!: User

  @ManyToOne(() => User, { eager: true })
  gestionnaire!: User

  @OneToMany(() => Besoin, (besoin) => besoin.opportunite)
  besoins!: Besoin[]

  @OneToOne(() => EnteteDemande)
  @JoinColumn()
  demande?: EnteteDemande

  @CreateDateColumn({ nullable: false })
  createdAt?: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt?: Date
}
