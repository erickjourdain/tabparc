import { Section } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import sectionController from '../database/controller/section'

ipcMain.handle('section.all', (_event, filter: FindManyOptions<Section>) =>
  sectionController.findAll(filter)
)
ipcMain.handle('section.search', (_event, filter: FindManyOptions<Section>, search: string) =>
  sectionController.search(filter, search)
)
ipcMain.handle('section.find', (_event, id: number) => sectionController.findById(id))
ipcMain.handle('section.update', (_event, section: Section) => sectionController.update(section))
ipcMain.handle('section.save', (_event, section: Section) => sectionController.save(section))
