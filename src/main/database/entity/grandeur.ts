import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Accreditation } from './accreditation'
import { Contact } from './contact'
import { FamilleInstrument } from './familleInstrument'
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

  @ManyToMany(() => FamilleInstrument, { eager: true })
  @JoinTable()
  instruments!: FamilleInstrument[]
}
