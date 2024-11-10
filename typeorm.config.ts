import { DataSource } from 'typeorm'

export default new DataSource({
  type: 'sqlite',
  database: 'C:/Users/jourdain/Documents/Outils/Electron/data/tabparc.db',
  entities: ['./src/main/database/entity/*.entity.ts'],
  migrations: ['./src/main/database/migrations/*.js']
})
