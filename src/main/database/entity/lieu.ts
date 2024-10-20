import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity()
@Unique('site_section', ['site', 'section'])
export class Lieu {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text', { nullable: false })
  site!: string

  @Column('int', { nullable: false })
  section!: string
}
