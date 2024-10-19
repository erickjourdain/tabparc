import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text', { nullable: false })
  nom!: string

  @Column('text', { nullable: false })
  prenom!: string

  @Column('text')
  email!: string

  @Column('text', { nullable: false })
  telephone!: string

  @Column('boolean')
  valide!: boolean
}
