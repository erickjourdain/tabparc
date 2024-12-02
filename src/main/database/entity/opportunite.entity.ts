import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user.entity'
import { Statut } from '@apptypes/'
import { Besoin } from './besoin.entity'

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

  @CreateDateColumn({ nullable: false })
  createdAt?: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt?: Date
}
