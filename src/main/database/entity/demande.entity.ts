import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { EnteteDemande } from './enteteDemande.entity'

@Entity()
export class Demande {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('varchar', { nullable: false })
  designation!: string

  @Column('int', { nullable: false })
  numLigne!: number

  @Column('varchar', { nullable: true })
  fabricant?: string | null

  @Column('varchar', { nullable: true })
  modele?: string | null

  @Column('varchar', { nullable: true })
  numSerie?: string | null

  @Column('varchar', { nullable: true })
  refClient?: string | null

  @Column('varchar', { nullable: true })
  grandeur?: string | null

  @Column('varchar', { nullable: true })
  precedentCE?: string | null

  @Column('varchar', { nullable: true })
  ptsMesures?: string | null

  @Column('varchar', { nullable: true })
  typePrestation?: string | null

  @Column('varchar', { nullable: true })
  emt?: string | null

  @Column('varchar', { nullable: true })
  periodicite?: string | null

  @Column('date', { nullable: true })
  dateSouhaitee?: Date | null

  @Column('varchar', { nullable: true })
  contact?: string | null

  @Column('varchar', { nullable: true })
  email?: string | null

  @Column('varchar', { nullable: true })
  telephone?: string | null

  @ManyToOne(() => EnteteDemande, { nullable: false })
  entete?: EnteteDemande
}
