import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Accreditation } from './accreditation'
import { Contact } from './contact'
import { Instrument } from './instrument'
import { Lieu } from './lieu'

@Entity()
export class Grandeur {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text', { nullable: false, unique: false })
  nom!: string

  @ManyToOne(() => Accreditation, (accreditation) => accreditation.grandeurs)
  accreditation!: Accreditation

  @ManyToMany(() => Contact)
  @JoinTable()
  contacts!: Contact[]

  @ManyToOne(() => Lieu, (lieu) => lieu.grandeurs)
  lieu!: Lieu

  @ManyToMany(() => Instrument)
  @JoinTable()
  instruments!: Instrument[]
}
