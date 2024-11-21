import 'reflect-metadata'
import { DataSource, EntitySchema, MixedList } from 'typeorm'
import * as entities from './entity'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
const ent: MixedList<string | Function | EntitySchema<any>> | undefined = []
for (const [key, _value] of Object.entries(entities)) {
  ent.push(entities[key])
}

const AppDataSource = new DataSource({
  type: 'mariadb',
  host: import.meta.env.MAIN_VITE_DB_HOST,
  username: import.meta.env.MAIN_VITE_DB_USER,
  password: import.meta.env.MAIN_VITE_DB_PWD,
  database: import.meta.env.MAIN_VITE_DB_DB,
  synchronize: false,
  entities: ent,
  logging: true
})

export default AppDataSource
