import { Section } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import sectionController from '../database/controller/section'

ipcMain.handle('section.all', (_event, args: [FindManyOptions<Section>]) => {
  try {
    return sectionController.findAll(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('section.search', (_event, args: [FindManyOptions<Section>, string]) => {
  try {
    return sectionController.search(args[0], args[1])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('section.find', (_event, args: [number]) => {
  try {
    return sectionController.findById(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('section.update', (_event, args: [Section]) => {
  try {
    return sectionController.update(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('section.save', (_event, args: [Section]) => {
  try {
    return sectionController.save(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})
