import { Site } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import siteController from '../database/controller/site'

ipcMain.handle('site.all', (_event, filter: FindManyOptions<Site>) =>
  siteController.findAll(filter)
)
ipcMain.handle('site.search', (_event, filter: FindManyOptions<Site>, search: string) =>
  siteController.search(filter, search)
)
ipcMain.handle('site.find', (_event, id: number) => siteController.findById(id))
ipcMain.handle('site.update', (_event, site: Site) => siteController.update(site))
ipcMain.handle('site.save', (_event, site: Site) => siteController.save(site))
