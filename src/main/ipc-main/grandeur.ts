import { Grandeur } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import grandeurController from '../database/controller/grandeur'

ipcMain.handle('grandeur.all', (_event, filter: FindManyOptions<Grandeur>) =>
  grandeurController.findAll(filter)
)
ipcMain.handle('grandeur.search', (_event, filter: FindManyOptions<Grandeur>, search: string) =>
  grandeurController.search(filter, search)
)
ipcMain.handle('grandeur.find', (_event, id: number) => grandeurController.findById(id))
ipcMain.handle('grandeur.update', (_event, grandeur: Grandeur) =>
  grandeurController.update(grandeur)
)
ipcMain.handle('grandeur.save', (_event, grandeur: Grandeur) => grandeurController.save(grandeur))
