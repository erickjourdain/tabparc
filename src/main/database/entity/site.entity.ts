import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Site {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar', { nullable: false, unique: true })
  nom!: string

  @Column('text')
  adresse?: string

  @Column('varchar')
  telephone?: string

  @Column('boolean', { nullable: false, default: true })
  valide!: true
}
