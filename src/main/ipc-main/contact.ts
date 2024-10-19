import { Contact } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import contactController from '../database/controller/contact'

ipcMain.handle('contact.all', (_event, filter: FindManyOptions<Contact>) =>
  contactController.findAll(filter)
)
ipcMain.handle('contact.search', (_event, filter: FindManyOptions<Contact>, search: string) =>
  contactController.search(filter, search)
)
ipcMain.handle('contact.find', (_event, id: number) => contactController.findById(id))
ipcMain.handle('contact.update', (_event, contact: Contact) => contactController.update(contact))
ipcMain.handle('contact.save', (_event, contact: Contact) => contactController.save(contact))
