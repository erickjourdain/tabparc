import { Lieu } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import lieuController from '../database/controller/lieu'

ipcMain.handle('lieu.all', (_event, filter: FindManyOptions<Lieu>) =>
  lieuController.findAll(filter)
)
ipcMain.handle('lieu.search', (_event, filter: FindManyOptions<Lieu>, search: string) =>
  lieuController.search(filter, search)
)
ipcMain.handle('lieu.find', (_event, id: number) => lieuController.findById(id))
ipcMain.handle('lieu.update', (_event, lieu: Lieu) => lieuController.update(lieu))
ipcMain.handle('lieu.save', (_event, lieu: Lieu) => lieuController.save(lieu))
