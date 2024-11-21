import { ipcMain } from 'electron'
import crm from '../database/mssql/crm'

ipcMain.handle('opportunite.search', (_event, opp: string) => {
  try {
    return crm.rechercheOpportunite(opp)
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})
