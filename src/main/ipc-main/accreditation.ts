import { Accreditation } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import accreditationController from '../database/controller/accreditation'

ipcMain.handle('accreditation.all', (_event, filter: FindManyOptions<Accreditation>) =>
  accreditationController.findAll(filter)
)
ipcMain.handle(
  'accreditation.search',
  (_event, filter: FindManyOptions<Accreditation>, search: string) =>
    accreditationController.search(filter, search)
)
ipcMain.handle('accreditation.find', (_event, id: number) => accreditationController.findById(id))
ipcMain.handle('accreditation.update', (_event, accreditation: Accreditation) =>
  accreditationController.update(accreditation)
)
ipcMain.handle('accreditation.save', (_event, accreditation: Accreditation) =>
  accreditationController.save(accreditation)
)
