import { Accreditation } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import accreditationController from '../database/controller/accreditation'

ipcMain.handle('accreditation.all', (_event, args: [FindManyOptions<Accreditation>]) => {
  try {
    return accreditationController.findAll(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('accreditation.search', (_event, args: [FindManyOptions<Accreditation>, string]) => {
  try {
    return accreditationController.search(args[0], args[1])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('accreditation.find', (_event, args: [number]) => {
  try {
    return accreditationController.findById(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('accreditation.update', (_event, args: [Accreditation]) => {
  try {
    return accreditationController.update(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('accreditation.save', (_event, args: [Accreditation]) => {
  try {
    return accreditationController.save(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})
