import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('int', { nullable: false })
  reference!: number

  @Column('varchar', { nullable: true })
  label?: string

  @Column('boolean', { nullable: false, default: true })
  valide!: boolean
}
