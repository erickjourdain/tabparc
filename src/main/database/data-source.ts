import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Accreditation, Contact, Grandeur, Instrument, Lieu, User } from './entity'

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: import.meta.env.MAIN_VITE_DB_PATH,
  entities: [Accreditation, Contact, Instrument, Grandeur, Lieu, User],
  synchronize: true,
  logging: true
})

export default AppDataSource
