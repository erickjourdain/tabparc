import { ipcMain } from 'electron'
import crm from '../database/mssql/crm'

ipcMain.handle('opportunite.search', (_event, opp) => crm.rechercheOpportunite(opp))
