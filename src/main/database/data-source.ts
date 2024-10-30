import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Accreditation, Contact, Grandeur, FamilleInstrument, Lieu, User } from './entity'

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: import.meta.env.MAIN_VITE_DB_PATH,
  entities: [Accreditation, Contact, FamilleInstrument, Grandeur, Lieu, User],
  synchronize: true,
  logging: true
})

export default AppDataSource
