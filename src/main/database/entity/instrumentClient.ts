import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { DemandeClient } from './demandeClient'

@Entity()
export class InstrumentClient {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('varchar', { nullable: false })
  designation!: string

  @Column('varchar')
  fabricant?: string

  @Column('varchar')
  modele?: string

  @Column('varchar')
  numSerie?: string

  @Column('varchar')
  refClient?: string

  @Column('varchar')
  grandeur?: string

  @Column('varchar')
  precedentCE?: string

  @Column('varchar')
  ptsMesures?: string

  @Column('varchar')
  typePrestation?: string

  @Column('varchar')
  emt?: string

  @Column('varchar')
  periodicite?: string

  @Column('varchar')
  dateSouhaitee?: Date

  @Column('varchar')
  contact?: string

  @Column('varchar')
  email?: string

  @Column('varchar')
  telephone?: string

  @ManyToOne(() => DemandeClient)
  demandeClient!: DemandeClient
}
