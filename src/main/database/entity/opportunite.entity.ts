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
import { Statut } from '@apptypes/'

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

  @ManyToMany(() => Instrument)
  instruments!: Instrument[]

  @CreateDateColumn({ nullable: false })
  createdAt?: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt?: Date
}
