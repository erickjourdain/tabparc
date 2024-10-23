import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Grandeur } from './grandeur'

@Entity()
export class Accreditation {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text', { nullable: false, unique: true })
  reference!: string

  @Column('boolean', { default: true })
  valide!: boolean

  @OneToMany(() => Grandeur, (grandeur) => grandeur.accreditation)
  grandeurs!: Grandeur[]
}
