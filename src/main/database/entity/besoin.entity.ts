import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Opportunite } from './opportunite.entity'
import { Instrument } from './instrument.entity'
import { Prestation } from './prestation.entity'

@Entity()
export class Besoin {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('int', { nullable: false })
  numLigne!: number

  @Column('varchar', { nullable: false })
  designation!: string

  @Column('varchar', { nullable: true })
  fabricant?: string | null

  @Column('varchar', { nullable: true })
  modele?: string | null

  @Column('varchar', { nullable: true })
  numSerie?: string | null

  @Column('varchar', { nullable: true })
  refCLient?: string | null

  @Column('varchar', { nullable: true })
  grandeur?: string | null

  @Column('varchar', { nullable: true })
  precedentCE?: string | null

  @Column('varchar', { nullable: true })
  ptsMesures?: string | null

  @Column('varchar', { nullable: true })
  typePrestation?: string | null

  @Column('varchar', { nullable: true })
  emt?: string | null

  @Column('varchar', { nullable: true })
  periodicite?: string | null

  @Column('date', { nullable: true })
  dateSouhaitee?: Date | null

  @Column('varchar', { nullable: true })
  contact?: string | null

  @Column('varchar', { nullable: true })
  email?: string | null

  @Column('varchar', { nullable: true })
  telephone?: string | null

  @ManyToOne(() => Opportunite)
  opportunite!: Opportunite

  @ManyToOne(() => Instrument)
  instrument!: Instrument

  @OneToOne(() => Prestation)
  @JoinColumn()
  prestation!: Prestation

  @CreateDateColumn({ nullable: false })
  createdAt?: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt?: Date
}
