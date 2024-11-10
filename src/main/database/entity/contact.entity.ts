import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar', { nullable: false })
  nom!: string

  @Column('varchar', { nullable: false })
  prenom!: string

  @Column('varchar', { nullable: false })
  email!: string

  @Column('varchar', { nullable: false })
  telephone!: string

  @Column('boolean', { nullable: false, default: true })
  valide!: boolean
}
