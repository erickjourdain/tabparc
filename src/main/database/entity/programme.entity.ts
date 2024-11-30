import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Instrument } from './instrument.entity'
import { Prestation } from './prestation.entity'
import { Opportunite } from './opportunite.entity'
import { TypePrestation } from '@apptypes/'

@Entity()
export class Programme {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { nullable: true })
  precedentCE?: string

  @Column('text', { nullable: true })
  ptsMesures?: string

  @Column({
    type: 'enum',
    enum: TypePrestation,
    default: TypePrestation.ETALONNAGE,
    nullable: false
  })
  typePrestation!: number

  @Column('text', { nullable: true })
  emt!: string

  @Column('text', { nullable: true })
  periodicite?: string

  @Column('date', { nullable: true })
  dateSouhaite?: Date

  @OneToOne(() => Prestation)
  prestion!: Prestation

  @ManyToOne(() => Instrument)
  instrument!: Instrument

  @ManyToOne(() => Opportunite)
  Opportunite!: Opportunite

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
