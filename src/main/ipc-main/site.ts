import { Site } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import siteController from '../database/controller/site'

ipcMain.handle('site.all', (_event, args: [FindManyOptions<Site>]) => {
  try {
    return siteController.findAll(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('site.search', (_event, args: [FindManyOptions<Site>, string]) => {
  try {
    return siteController.search(args[0], args[1])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('site.find', (_event, args: [number]) => {
  try {
    return siteController.findById(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('site.update', (_event, args: [Site]) => {
  try {
    return siteController.update(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('site.save', (_event, args: [Site]) => {
  try {
    return siteController.save(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})
