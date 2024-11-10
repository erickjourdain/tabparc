import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Prestation {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('varchar', { nullable: false })
  codeProduit!: string

  @Column('text', { nullable: false })
  libelle!: string

  @Column('varchar', { nullable: false })
  lebelleUBW!: string

  @Column('int8', { nullable: false, default: 1 })
  quantite?: number

  @Column('float', { nullable: false, default: 0 })
  prixUnitaire?: number
}
