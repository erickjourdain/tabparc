import { FamilleInstrument } from '@entity/*'
import { ipcMain } from 'electron'
import { FindManyOptions } from 'typeorm'
import familleInstrument from '../database/controller/familleInstrument'

ipcMain.handle('famille-instrument.all', (_event, filter: FindManyOptions<FamilleInstrument>) =>
  familleInstrument.findAll(filter)
)
ipcMain.handle(
  'instrument.search',
  (_event, filter: FindManyOptions<FamilleInstrument>, search: string) =>
    familleInstrument.search(filter, search)
)
ipcMain.handle('famille-instrument.find', (_event, id: number) => familleInstrument.findById(id))
ipcMain.handle('famille-instrument.update', (_event, instrument: FamilleInstrument) =>
  familleInstrument.update(instrument)
)
ipcMain.handle('famille-instrument.save', (_event, instrument: FamilleInstrument) =>
  familleInstrument.save(instrument)
)
