import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class FamilleInstrument {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('varchar', { nullable: false, unique: true })
  nom!: string

  @Column('boolean', { nullable: false, default: true })
  valide!: boolean
}
