import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Accreditation } from './accreditation.entity'
import { Contact } from './contact.entity'
import { FamilleInstrument } from './familleInstrument.entity'
import { Lieu } from './lieu.entity'

@Entity()
export class Grandeur {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('varchar', { nullable: false, unique: true })
  nom!: string

  @ManyToOne(() => Accreditation)
  accreditation!: Accreditation

  @ManyToMany(() => Contact)
  @JoinTable()
  contacts!: Contact[]

  @ManyToOne(() => Lieu, { nullable: false })
  lieu!: Lieu

  @ManyToMany(() => FamilleInstrument)
  @JoinTable()
  instruments!: FamilleInstrument[]
}
