import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Grandeur } from './grandeur'

@Entity()
@Unique('site_section', ['site', 'section'])
export class Lieu {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text', { nullable: false })
  site!: string

  @Column('int', { nullable: false })
  section!: string

  @OneToMany(() => Grandeur, (grandeur) => grandeur.accreditation)
  grandeurs!: Grandeur[]
}
