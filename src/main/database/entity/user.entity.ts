import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum UserRole {
  ADMIN = 'ADMIN',
  COMMERCIAL = 'COMMERCIAL',
  CHEF_PROJET = 'CHEF PROJET',
  ADV = 'ADV',
  READER = 'READER'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar', { nullable: false })
  nom!: string

  @Column('varchar', { nullable: false })
  prenom!: string

  @Column('varchar', { nullable: false, unique: true })
  login!: string

  @Column('varchar', { nullable: false })
  email!: string

  @Column('varchar', { nullable: false })
  titre!: string

  @Column('varchar', { nullable: false })
  telephone!: string

  @Column('boolean', { nullable: true, default: true })
  valide!: boolean

  @Column({
    type: 'varchar',
    enum: UserRole,
    default: 'READER'
  })
  role!: UserRole
}