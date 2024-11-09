import { ipcMain, shell } from 'electron'
import crm from '../database/mssql/crm'
import stockage from '../utils/stockage'

// Ouverture du répertoire de l'opportunité
ipcMain.handle('directory.openOpportunite', async (_event, refOpp) => {
  try {
    // vérification état opportunité
    const opp = await crm.rechercheOpportunite(refOpp)
    if (opp === null) return new Error("L'Opportunité recherchée n'existe pas")

    // chemin du stockage des données de l'opportunité
    const dirOpp = stockage.oppPath(opp)

    // ouverture de l'explorateur
    shell.openPath(dirOpp)

    // retour vers la fenêtre d'appel
    return true
  } catch (error) {
    return error
  }
})
