import { dialog, ipcMain } from 'electron'
import Exceljs from 'exceljs'
import crm from '../database/mssql/crm'
import stockage from '../utils/stockage'
import { DataInstrument, ErrorType } from '../type'
import { getDatevalue, getStringValue } from '../utils/excel'
import demandeController from '../database/controller/demande'
import { Demande } from '@entity/*'

ipcMain.handle('instrument.load', async (_event, refOpp: string) => {
  try {
    // vérification état opportunité
    const opp = await crm.rechercheOpportunite(refOpp)
    if (opp === null)
      return new AppError(ErrorType.DB_NOT_FOUND, "L'Opportunité recherchée n'existe pas")
    if (opp.statut.indexOf('Close)') >= 0)
      return new AppError(ErrorType.DB_NOT_ALLOWED, "L'opportunité est close")

    // recherche de la demande correspondante
    const demande = (await demandeController.findByOpportunite(opp.reference, false)) as Demande
    if (demande === null)
      return new AppError(ErrorType.DB_NOT_FOUND, "Aucune demande associée à l'opportunité")

    // chemin du stockage des données de l'opportunité
    const dirOpp = stockage.oppPath(opp)

    // Choix du fichier à importer
    const file = await dialog.showOpenDialog({
      title: 'Sélectionner le fichier avec les instruments client',
      defaultPath: dirOpp.replaceAll('/', '\\'),
      filters: [{ name: 'fichier Excel', extensions: ['xlsx', 'xls'] }],
      properties: ['openFile']
    })

    // Ouverture du fichier
    if (file.canceled) throw new AppError(ErrorType.FILE_IO, 'Aucun fichier sélectionné')
    const workbook = new Exceljs.Workbook()
    await workbook.xlsx.readFile(file.filePaths[0])
    const worksheet = workbook.worksheets[0]
    // Lecture du fichier client
    // entête
    const data: DataInstrument = {
      date: await getDatevalue(worksheet.getCell('B2')),
      client: await getStringValue(worksheet.getCell('B4')),
      contact: await getStringValue(worksheet.getCell('B5')),
      email: await getStringValue(worksheet.getCell('F5')),
      telephone: await getStringValue(worksheet.getCell('F6')),
      delaiDemande: await getDatevalue(worksheet.getCell('J5')),
      instruments: []
    }

    // instruments
    for (let i = 10; i < worksheet.actualRowCount; i++) {
      if (worksheet.getCell(i, 1).value)
        data.instruments.push({
          designation: await getStringValue(worksheet.getCell(i, 1)),
          fabricant: await getStringValue(worksheet.getCell(i, 2)),
          type: await getStringValue(worksheet.getCell(i, 3)),
          numSerie: await getStringValue(worksheet.getCell(i, 4)),
          refClient: await getStringValue(worksheet.getCell(i, 5)),
          grandeur: await getStringValue(worksheet.getCell(i, 6)),
          idemCE: await getStringValue(worksheet.getCell(i, 7)),
          pointsMesures: await getStringValue(worksheet.getCell(i, 8)),
          prestation: await getStringValue(worksheet.getCell(i, 9)),
          emt: await getStringValue(worksheet.getCell(i, 10)),
          periodicite: await getStringValue(worksheet.getCell(i, 11)),
          datePlanif: await getDatevalue(worksheet.getCell(i, 12)),
          contact: await getStringValue(worksheet.getCell(i, 13)),
          email: await getStringValue(worksheet.getCell(i, 14)),
          telephone: await getStringValue(worksheet.getCell(i, 15))
        })
    }

    // retour vers la fenêtre d'appel
    return data
  } catch (error) {
    return error
  }
})

ipcMain.handle('instrument.save', async (_event, demande: Demande) => {
  /*
  // Lancement des enregsitrements
  const queryRunner = AppDataSource.createQueryRunner()
  await queryRunner.connect()
  await queryRunner.startTransaction()
  try {
    demande.dateRetour = data.date || undefined
    demande.dateSouhaitee = data.delaiDemande || undefined
    await queryRunner.manager.save(demande)
  } catch (err) {
    await queryRunner.rollbackTransaction()
    return new AppError(
      ErrorType.DB_SAVE,
      "impossible d'enregistrer la liste des instruments dans la base de données"
    )
  } finally {
    await queryRunner.release()
  }
  */
  console.log(demande)
  return true
})
