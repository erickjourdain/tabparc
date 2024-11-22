import { FamilleInstrument } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import familleInstrument from '../database/controller/familleInstrument'

ipcMain.handle('famille-instrument.all', (_event, args: [FindManyOptions<FamilleInstrument>]) => {
  try {
    return familleInstrument.findAll(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle(
  'famille-instrument.search',
  (_event, args: [FindManyOptions<FamilleInstrument>, string]) => {
    try {
      return familleInstrument.search(args[0], args[1])
    } catch (error) {
      return {
        error,
        handle_as_rejected_promise: true
      }
    }
  }
)

ipcMain.handle('famille-instrument.find', (_event, args: [number]) => {
  try {
    return familleInstrument.findById(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('famille-instrument.update', (_event, args: [FamilleInstrument]) => {
  try {
    return familleInstrument.update(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('famille-instrument.save', (_event, args: [FamilleInstrument]) => {
  try {
    return familleInstrument.save(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})
