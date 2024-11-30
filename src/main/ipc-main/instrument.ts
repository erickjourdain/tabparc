import { dialog, ipcMain } from 'electron'
import Exceljs from 'exceljs'
import crm from '../database/mssql/crm'
import stockage from '../utils/stockage'
import { getDatevalue, getStringValue } from '../utils/excel'
import opportuniteController from '../database/controller/opportunite'
import { Opportunite } from '@entity/*'
import { DemandeClient } from '@apptypes/*'

ipcMain.handle('instrument.load', async (_event, args: [string]) => {
  try {
    // vérification état opportunité CM
    const opp = await crm.rechercheOpportunite(args[0])
    if (opp === null) throw new Error("L'Opportunité recherchée n'existe pas")
    if (opp.statut.indexOf('Close)') >= 0) throw new Error("L'opportunité est close")

    // recherche de la demande correspondante
    const { opportunite } = await opportuniteController.findByOpportunite(opp.reference, false)
    if (opportunite === null) throw new Error('Aucune opportunité associée à cette référence')

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
    if (file.canceled) throw new Error('Aucun fichier sélectionné')
    const workbook = new Exceljs.Workbook()
    await workbook.xlsx.readFile(file.filePaths[0])
    const worksheet = workbook.worksheets[0]
    // Lecture du fichier client
    // entête
    const data: DemandeClient = {
      fichier: file.filePaths[0],
      date: await getDatevalue(worksheet.getCell('B2')),
      client: await getStringValue(worksheet.getCell('B4')),
      contact: await getStringValue(worksheet.getCell('B5')),
      email: await getStringValue(worksheet.getCell('F5')),
      telephone: await getStringValue(worksheet.getCell('F6')),
      dateSouhaitee: await getDatevalue(worksheet.getCell('J5')),
      instruments: []
    }

    // instruments
    for (let i = 10; i < worksheet.actualRowCount; i++) {
      const designation = await getStringValue(worksheet.getCell(i, 1))
      if (designation === null) continue
      data.instruments.push({
        designation,
        fabricant: await getStringValue(worksheet.getCell(i, 2)),
        modele: await getStringValue(worksheet.getCell(i, 3)),
        numSerie: await getStringValue(worksheet.getCell(i, 4)),
        refClient: await getStringValue(worksheet.getCell(i, 5)),
        grandeur: await getStringValue(worksheet.getCell(i, 6)),
        precedentCE: await getStringValue(worksheet.getCell(i, 7)),
        ptsMesures: await getStringValue(worksheet.getCell(i, 8)),
        typePrestation: await getStringValue(worksheet.getCell(i, 9)),
        emt: await getStringValue(worksheet.getCell(i, 10)),
        periodicite: await getStringValue(worksheet.getCell(i, 11)),
        dateSouhaitee: await getDatevalue(worksheet.getCell(i, 12)),
        contact: await getStringValue(worksheet.getCell(i, 13)),
        email: await getStringValue(worksheet.getCell(i, 14)),
        telephone: await getStringValue(worksheet.getCell(i, 15))
      })
    }

    // retour vers la fenêtre d'appel
    return data
  } catch (error) {
    return {
      error,
      handle_as_rejected_promise: true
    }
  }
})

ipcMain.handle('instrument.save', async (_event, opportunite: Opportunite) => {
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
    throw new Error(VE,
      "impossible d'enregistrer la liste des instruments dans la base de données"
    )
  } finally {
    await queryRunner.release()
  }
  */
  console.log(opportunite)
  return true
})
