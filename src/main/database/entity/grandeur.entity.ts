import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm'
import { Accreditation } from './accreditation.entity'
import { Contact } from './contact.entity'
import { FamilleInstrument } from './familleInstrument.entity'
import { Section } from './section.entity'
import { Site } from './site.entity'

@Entity()
@Unique('nom_lieu', ['nom', 'section', 'site'])
export class Grandeur {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('varchar', { nullable: false })
  nom!: string

  @Column('boolean', { nullable: false, default: true })
  valide!: true

  @ManyToOne(() => Accreditation)
  accreditation!: Accreditation

  @ManyToMany(() => Contact)
  @JoinTable()
  contacts!: Contact[]

  @ManyToOne(() => Section, { nullable: false })
  section!: Section

  @ManyToOne(() => Site, { nullable: false })
  site!: Site

  @ManyToMany(() => FamilleInstrument)
  @JoinTable()
  instruments!: FamilleInstrument[]
}
