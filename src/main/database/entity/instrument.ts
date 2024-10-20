import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Instrument {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text', { nullable: false, unique: true })
  nom!: string

  @Column('boolean', { default: true })
  valide!: boolean
}
