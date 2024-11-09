import 'reflect-metadata'
import { DataSource } from 'typeorm'
import {
  Accreditation,
  Contact,
  Grandeur,
  FamilleInstrument,
  Lieu,
  User,
  Demande,
  Instrument,
  Programme
} from './entity'

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: import.meta.env.MAIN_VITE_DB_PATH,
  entities: [
    Accreditation,
    Contact,
    Demande,
    FamilleInstrument,
    Grandeur,
    Instrument,
    Lieu,
    Programme,
    User
  ],
  synchronize: true,
  logging: true
})

export default AppDataSource
