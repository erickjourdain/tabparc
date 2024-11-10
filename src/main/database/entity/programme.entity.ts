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

export enum TypePrestation {
  ETALONNAGE = 0,
  VERIFICATION = 1,
  ETALONNAGE_VERIFICATOION = 2
}

@Entity()
export class Programme {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  precedenCE!: string

  @Column('text')
  ptsMesures!: string

  @Column({
    type: 'int8',
    enum: TypePrestation,
    default: TypePrestation.ETALONNAGE,
    nullable: false
  })
  typePrestation!: number

  @Column('text')
  emt!: string

  @Column('text')
  periodicite!: string

  @Column('date')
  dateSouhaite!: Date

  @OneToOne(() => Prestation)
  prestion!: Prestation

  @ManyToOne(() => Instrument)
  instrument!: Instrument

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
