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
  libelleUBW!: string

  @Column('int', { nullable: false, default: 1 })
  quantite?: number

  @Column('float', { nullable: false, default: 0 })
  prixUnitaire?: number
}
