import { ipcMain, shell } from 'electron'
import crm from '../database/mssql/crm'
import stockage from '../utils/stockage'

// Ouverture du répertoire de l'opportunité
ipcMain.handle('directory.openOpportunite', async (_event, args: [string]) => {
  try {
    // vérification état opportunité
    const opp = await crm.rechercheOpportunite(args[0])
    if (opp === null) throw new Error("L'Opportunité recherchée n'existe pas")

    // chemin du stockage des données de l'opportunité
    const dirOpp = stockage.oppPath(opp)

    // ouverture de l'explorateur
    shell.openPath(dirOpp)

    // retour vers la fenêtre d'appel
    return true
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})
