import { ipcMain } from 'electron'
import { Opportunite } from '../type'
import stockage from '../utils/stockage'
import { shell } from 'electron'

ipcMain.handle('demande.new', (_event, opp: Opportunite) => {
  const dir = stockage.oppPath(opp)
  console.log(dir)
  shell.openPath(dir)
  return dir
})
