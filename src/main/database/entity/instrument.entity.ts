import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Besoin } from './besoin.entity'

@Entity()
@Unique('numSerie_refClient', ['numSerie', 'refClient'])
export class Instrument {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('varchar', { nullable: false })
  designation!: string

  @Column('varchar', { nullable: true })
  fabricant?: string

  @Column('varchar', { nullable: true })
  modele?: string

  @Column('varchar', { nullable: false })
  numSerie?: string

  @Column('varchar', { nullable: false })
  refClient?: string

  @Column('varchar', { nullable: false, unique: true })
  refLNE?: string

  @Column('int', { nullable: false })
  codeClient!: number

  @Column('varchar', { nullable: true })
  contact?: string

  @Column('varchar', { nullable: true })
  email?: string

  @Column('varchar', { nullable: true })
  telephone?: string

  @Column('boolean', { nullable: false, default: true })
  valide!: boolean

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date

  @OneToMany(() => Besoin, (besoin) => besoin.instrument)
  besoins!: Besoin[]

  @BeforeInsert()
  setClientKey() {
    if (this.numSerie === null || this.numSerie === undefined) this.numSerie = `LNE-${uuidv4()}`
    if (this.refClient === null || this.refClient === undefined) this.refLNE = `LNE-${uuidv4()}`
  }
}
