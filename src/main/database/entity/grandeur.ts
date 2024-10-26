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

  @ManyToOne(() => Accreditation, (accreditation) => accreditation.grandeurs, { eager: true })
  accreditation!: Accreditation

  @ManyToMany(() => Contact, { eager: true })
  @JoinTable()
  contacts!: Contact[]

  @ManyToOne(() => Lieu, (lieu) => lieu.grandeurs, { eager: true })
  lieu!: Lieu

  @ManyToMany(() => Instrument, { eager: true })
  @JoinTable()
  instruments!: Instrument[]
}
