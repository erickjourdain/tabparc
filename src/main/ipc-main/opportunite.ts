import { ipcMain } from 'electron'
import crm from '../database/mssql/crm'

ipcMain.handle('opportunite.search', (_event, args: [string]) => {
  try {
    return crm.rechercheOpportunite(args[0])
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})
