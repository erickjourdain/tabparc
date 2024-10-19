import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Contact, User } from './entity'

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: '/Users/erickjourdain/Programmation/Data/tabparc.db',
  entities: [User, Contact],
  synchronize: true,
  logging: true
})

export default AppDataSource
