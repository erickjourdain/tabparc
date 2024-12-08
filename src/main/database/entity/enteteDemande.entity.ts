import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Demande } from './demande.entity'

@Entity()
export class EnteteDemande {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  fichier?: string | null

  @Column('date')
  date?: Date | null

  @Column('varchar')
  contact?: string | null

  @Column('varchar')
  email?: string | null

  @Column('varchar')
  telephone?: string | null

  @Column('date')
  dateSouhaitee?: Date | null

  @OneToMany(() => Demande, (demande) => demande.entete)
  demandes!: Demande[]
}
