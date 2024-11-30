import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Opportunite } from './opportunite.entity'
import { Programme } from './programme.entity'

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

  @OneToMany(() => Programme, (programme) => programme.instrument)
  programmes!: Programme[]

  @ManyToMany(() => Opportunite)
  Opportunites!: Opportunite[]

  @BeforeInsert()
  setClientKey() {
    if (this.numSerie === null || this.numSerie === undefined) this.numSerie = `LNE-${uuidv4()}`
    if (this.refClient === null || this.refClient === undefined) this.refClient = `LNE-${uuidv4()}`
  }
}
