import { ipcMain } from 'electron'
import stockage from '../utils/stockage'
import ExcelJS from 'exceljs'
import { shell } from 'electron'
import fs from 'fs'
import { dayFromDate, monthFromDate, yearFromdate } from '../utils/extractData'
import { mailListeInstrument } from '../utils/message'
import crm from '../database/mssql/crm'
import demandeController from '../database/controller/demande'
import { loggedUser } from '../database/controller/login'
import { FindManyOptions } from 'typeorm'
import { Demande } from '@entity/*'

// création d'une nouvelle demande
ipcMain.handle('demande.new', async (_event, refOpp: string) => {
  try {
    // vérification que l'utilisateur est loggé
    if (loggedUser === null) return new Error('Vous devez être loggé pour réaliser cette opération')

    // vérification état opportunité
    const opp = await crm.rechercheOpportunite(refOpp)
    if (opp === null) return new Error("L'Opportunité recherchée n'existe pas")
    if (opp.statut.indexOf('Close)') >= 0) return new Error("L'opportunité est close")

    // chemin du stockage des données de l'opportunité
    const dirOpp = stockage.oppPath(opp)

    // création et sauvegarde du fichie Excel pour le client
    const templatePath = `${import.meta.env.MAIN_VITE_TEMPLATE_PATH}/Demande_clients.xlsx`
    const year = yearFromdate(opp.dateCreation)
    const month = monthFromDate(opp.dateCreation)
    const day = dayFromDate(opp.dateCreation)
    const fichierXLSX = `${dirOpp}/${year}${month}${day}_${opp.reference}_demande.xlsx`
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(templatePath)
    const worksheet = workbook.worksheets[0]
    worksheet.getCell('B4').value = opp.client
    worksheet.getCell('B5').value = `${opp.contactNom} ${opp.contactPrenom}`
    worksheet.getCell('F5').value = opp.contactEmail
    worksheet.getCell('F6').value = opp.contactTelephone
    await workbook.xlsx.writeFile(fichierXLSX)

    // création et sauvegarde du message à envoyer
    const mail = mailListeInstrument(opp, dirOpp)
    const stream = mail.compile().createReadStream()
    const emailFile = fs.createWriteStream(`${dirOpp}/liste instrument.eml`)
    stream.pipe(emailFile)

    // création de la demande
    const demande = await demandeController.save({
      refOpportunite: opp.reference,
      client: opp.client,
      codeClient: opp.codeClient,
      createur: loggedUser,
      gestionnaire: loggedUser,
      instruments: []
    })
    return demande
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

/**
 * Ouverture du message d'envoi de la demande au client
 */
ipcMain.handle('demande.openEmail', async (_event, refOpp: string) => {
  // vérification état opportunité
  const opp = await crm.rechercheOpportunite(refOpp)
  if (opp === null) return new Error("L'Opportunité recherché n'existe pas")
  // chemin du stockage des données de l'opportunité
  const dirOpp = stockage.oppPath(opp)

  // ouverture du message pour envoi
  shell.openPath(`${dirOpp}/liste instrument.eml`)

  return true
})

// Recherche de toutes les demandes
ipcMain.handle('demande.all', (_event, filter: FindManyOptions<Demande>) =>
  demandeController.findAll(filter)
)

//Recherhce de demandes en fonction de la référence de l'opportunité ou du client
ipcMain.handle('demande.search', (_event, filter: FindManyOptions<Demande>, search: string) =>
  demandeController.search(filter, search)
)

// Mise à jour d'une demande
ipcMain.handle('demande.update', (_event, demande: Demande) => demandeController.update(demande))

// Recherche d'une demande via son id
ipcMain.handle('demande.find', (_event, id: number) => {
  try {
    return demandeController.findById(id)
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

// Recherche d'une demande via son opportunité
ipcMain.handle('demande.findOpp', (_event, refOpp: string, withOpp: boolean) =>
  demandeController.findByOpportunite(refOpp, withOpp)
)
