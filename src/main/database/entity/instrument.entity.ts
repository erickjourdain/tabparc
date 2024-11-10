import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Demande } from './demande.entity'

@Entity()
@Unique('numSerie_refClient', ['numSerie', 'refClient'])
export class Instrument {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('varchar', { nullable: false })
  designation!: string

  @Column('varchar')
  fabricant?: string

  @Column('varchar')
  type?: string

  @Column('varchar', { nullable: false })
  numSerie?: string

  @Column('varchar', { nullable: false })
  refClient?: string

  @Column('varchar')
  contact?: string

  @Column('varchar')
  email?: string

  @Column('varchar')
  telephone?: string

  @Column('boolean', { nullable: false, default: true })
  valide!: boolean

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date

  @ManyToMany(() => Demande)
  demandes!: Demande[]

  @BeforeInsert()
  setClientKey() {
    if (this.numSerie === null) this.numSerie = `LNE-${uuidv4()}`
    if (this.refClient === null) this.refClient = `LNE-${uuidv4()}`
  }
}