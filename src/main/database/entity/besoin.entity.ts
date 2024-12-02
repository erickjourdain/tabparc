import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column('varchar', { nullable: false })
  designation!: string

  @Column('varchar', { nullable: true })
  fabricant?: string

  @Column('varchar', { nullable: true })
  modele?: string

  @Column('varchar', { nullable: true })
  numSerie?: string

  @Column('varchar', { nullable: true })
  refCLient?: string

  @Column('varchar', { nullable: true })
  grandeur?: string

  @Column('varchar', { nullable: true })
  precedentCE?: string

  @Column('varchar', { nullable: true })
  ptsMesures?: string

  @Column('varchar', { nullable: true })
  typePrestation?: string

  @Column('varchar', { nullable: true })
  emt?: string

  @Column('varchar', { nullable: true })
  periodicite?: string

  @Column('date', { nullable: true })
  dateSouhaitee?: Date

  @Column('varchar')
  contact?: string

  @Column('varchar')
  email?: string

  @Column('varchar')
  telephone?: string

  @ManyToOne(() => Opportunite)
  opportunite!: Opportunite

  @ManyToOne(() => Instrument)
  instrument!: Instrument

  @OneToOne(() => Prestation)
  prestation!: Prestation

  @CreateDateColumn({ nullable: false })
  createdAt?: Date

  @UpdateDateColumn({ nullable: false })
  updatedAt?: Date
}
