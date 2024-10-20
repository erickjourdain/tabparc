import { Instrument } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import instrumentController from '../database/controller/instrument'

ipcMain.handle('instrument.all', (_event, filter: FindManyOptions<Instrument>) =>
  instrumentController.findAll(filter)
)
ipcMain.handle('instrument.search', (_event, filter: FindManyOptions<Instrument>, search: string) =>
  instrumentController.search(filter, search)
)
ipcMain.handle('instrument.find', (_event, id: number) => instrumentController.findById(id))
ipcMain.handle('instrument.update', (_event, instrument: Instrument) =>
  instrumentController.update(instrument)
)
ipcMain.handle('instrument.save', (_event, instrument: Instrument) =>
  instrumentController.save(instrument)
)
