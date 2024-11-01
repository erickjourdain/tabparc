import { ipcMain } from 'electron'
import { Opportunite } from '../type'
import stockage from '../utils/stockage'
import ExcelJS from 'exceljs'
import { shell } from 'electron'
import fs from 'fs'
import { dayFromDate, monthFromDate, yearFromdate } from '../utils/extractData'
import { mailListeInstrument } from '../utils/message'

ipcMain.handle('demande.new', async (_event, opp: Opportunite) => {
  // chemin du stockage des données de l'opportunité
  const dirOpp = stockage.oppPath(opp)

  // crétaion et sauvegarde du fichie Excel pour le client
  const templatePath = `${import.meta.env.MAIN_VITE_TEMPLATE_PATH}/Demande_clients.xlsx`
  const year = yearFromdate(opp.dateCreation)
  const month = monthFromDate(opp.dateCreation)
  const day = dayFromDate(opp.dateCreation)
  const demande = `${dirOpp}/${year}${month}${day}_${opp.reference}_demande.xlsx`
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(templatePath)
  const worksheet = workbook.worksheets[0]
  worksheet.getCell('B4').value = opp.client
  worksheet.getCell('B5').value = `${opp.contactNom} ${opp.contactPrenom}`
  worksheet.getCell('F5').value = opp.contactEmail
  worksheet.getCell('F6').value = opp.contactTelephone
  await workbook.xlsx.writeFile(demande)

  // création et sauvegarde du message à envoyer
  const mail = mailListeInstrument(opp, dirOpp)
  const stream = mail.compile().createReadStream()
  const emailFile = fs.createWriteStream(`${dirOpp}/liste instrument.eml`)
  stream.pipe(emailFile)

  // ouverture du message pour envoi
  shell.openPath(`${dirOpp}/liste instrument.eml`)
  return true
})
