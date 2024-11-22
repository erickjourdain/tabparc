import { Grandeur } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import grandeurController from '../database/controller/grandeur'

ipcMain.handle('grandeur.all', (_event, args: [FindManyOptions<Grandeur>, string[]]) => {
  try {
    return grandeurController.findAll(args[0], args[1])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('grandeur.search', (_event, args: [FindManyOptions<Grandeur>, string, string[]]) => {
  try {
    return grandeurController.search(args[0], args[1], args[2])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('grandeur.find', (_event, args: [number, string[]]) => {
  try {
    return grandeurController.findById(args[0], args[1])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('grandeur.update', (_event, args: [Grandeur]) => {
  try {
    return grandeurController.update(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('grandeur.save', (_event, args: [Grandeur]) => {
  try {
    return grandeurController.save(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})
