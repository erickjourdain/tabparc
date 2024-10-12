import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/user'

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: '/Users/erickjourdain/Programmation/Data/tabparc.db',
  entities: [User],
  synchronize: true,
  logging: true
})

export default AppDataSource
