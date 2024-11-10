import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Site } from './site.entity'
import { Section } from './section.entity'

@Entity()
@Unique('site_section', ['site', 'section'])
export class Lieu {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Site, { nullable: false })
  site!: Site

  @ManyToOne(() => Section, { nullable: false })
  section!: Section

  @Column('boolean', { nullable: false, default: true })
  valide!: boolean
}
