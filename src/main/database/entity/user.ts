import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  READER = 'READER'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text', { nullable: false })
  nom!: string

  @Column('text', { nullable: false })
  prenom!: string

  @Column('text', { nullable: false })
  login!: string

  @Column('text', { nullable: false })
  email!: string

  @Column('boolean')
  valide!: boolean

  @Column({
    type: 'text',
    enum: UserRole,
    default: UserRole.READER
  })
  role!: UserRole
}
