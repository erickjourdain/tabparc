import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Accreditation {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text', { nullable: false, unique: true })
  reference!: string

  @Column('boolean', { default: true })
  valide!: boolean
}
