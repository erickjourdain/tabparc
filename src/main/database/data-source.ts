import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Accreditation, Contact, Instrument, Lieu, User } from './entity'

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: '/Users/erickjourdain/Programmation/Data/tabparc.db',
  entities: [User, Contact, Lieu, Accreditation, Instrument],
  synchronize: true,
  logging: true
})

export default AppDataSource
