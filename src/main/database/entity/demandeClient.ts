import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { InstrumentClient } from './instrumentClient'

@Entity()
export class DemandeClient {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { nullable: false })
  fichier!: string

  @Column('date', { nullable: false })
  date!: Date

  @Column('varchar', { nullable: false })
  contact!: string

  @Column('varchar', { default: null })
  email?: string

  @Column('varchar', { default: null })
  telephone?: string

  @Column('date')
  dateSouhaitee!: Date

  @OneToMany(() => InstrumentClient, (instrumentClient) => instrumentClient.demandeClient)
  instruments!: InstrumentClient[]
}
