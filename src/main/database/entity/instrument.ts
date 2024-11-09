import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Programme } from './programme'
import { Grandeur } from './grandeur'
import { Demande } from './demande'

@Entity()
@Unique('numSerie_refClient', ['numSerie', 'refClient'])
export class Instrument {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { nullable: false })
  designation!: string

  @Column('text')
  fabricant!: string

  @Column('text')
  type!: string

  @Column('text', { nullable: false })
  numSerie!: string

  @Column('text', { nullable: false })
  refClient!: string

  @Column('text')
  contact!: string

  @Column('text')
  email!: string

  @Column('text')
  telephone!: string

  @Column('boolean', { default: true })
  valide!: boolean

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date

  @OneToMany(() => Programme, (programme) => programme.instrument, { cascade: true })
  programmes!: Programme[]

  @OneToMany(() => Grandeur, (grandeur) => grandeur.instrument, { cascade: true })
  grandeurs!: Grandeur[]

  @ManyToOne(() => Demande)
  demande!: Demande

  @BeforeInsert()
  setClientKey() {
    if (this.numSerie === null) this.numSerie = `LNE-${uuidv4()}`
    if (this.refClient === null) this.refClient = `LNE-${uuidv4()}`
  }
}
