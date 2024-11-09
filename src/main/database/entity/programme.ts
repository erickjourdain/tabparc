import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Instrument } from './instrument'

@Entity()
export class Programme {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  precedenCE!: string

  @Column('text')
  ptsMesures!: string

  @Column('text')
  prestation!: string

  @Column('text')
  emt!: string

  @Column('text')
  periodicite!: string

  @Column('date')
  dateSouhaite!: Date

  @ManyToOne(() => Instrument)
  instrument!: Instrument

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
