import { Grandeur } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import grandeurController from '../database/controller/grandeur'

ipcMain.handle('grandeur.all', (_event, filter: FindManyOptions<Grandeur>, relations?: string[]) =>
  grandeurController.findAll(filter, relations)
)
ipcMain.handle(
  'grandeur.search',
  (_event, filter: FindManyOptions<Grandeur>, search: string, relations?: string[]) =>
    grandeurController.search(filter, search, relations)
)
ipcMain.handle('grandeur.find', (_event, id: number, relations?: string[]) =>
  grandeurController.findById(id, relations)
)
ipcMain.handle('grandeur.update', (_event, grandeur: Grandeur) =>
  grandeurController.update(grandeur)
)
ipcMain.handle('grandeur.save', (_event, grandeur: Grandeur) => grandeurController.save(grandeur))
