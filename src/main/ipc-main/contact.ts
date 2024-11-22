import { Contact } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import contactController from '../database/controller/contact'

ipcMain.handle('contact.all', (_event, args: [FindManyOptions<Contact>]) => {
  try {
    return contactController.findAll(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('contact.search', (_event, args: [FindManyOptions<Contact>, string]) => {
  try {
    return contactController.search(args[0], args[1])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('contact.find', (_event, args: [number]) => {
  try {
    return contactController.findById(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('contact.update', (_event, args: [Contact]) => {
  try {
    return contactController.update(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('contact.save', (_event, args: [Contact]) => {
  try {
    return contactController.save(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})
