import { ipcMain } from 'electron'
//import { copyFile } from 'fs/promises'
import { Opportunite } from '../type'
import stockage from '../utils/stockage'
import ExcelJS from 'exceljs'
//import { shell } from 'electron'

ipcMain.handle('demande.new', async (_event, opp: Opportunite) => {
  const dirOpp = stockage.oppPath(opp)
  const templatePath = `${import.meta.env.MAIN_VITE_TEMPLATE_PATH}/Demande_clients.xlsx`
  const year = opp.dateCreation.getFullYear()
  const month = opp.dateCreation.toLocaleDateString().substring(3, 5)
  const day = opp.dateCreation.toLocaleDateString().substring(7, 9)
  const demande = `${dirOpp}/${year}${month}${day}_${opp.reference}_demande.xlsx`
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(templatePath)
  const worksheet = workbook.worksheets[0]
  worksheet.getCell('B4').value = opp.client
  worksheet.getCell('B5').value = `${opp.contactNom} ${opp.contactPrenom}`
  worksheet.getCell('F5').value = opp.contactEmail
  worksheet.getCell('F6').value = opp.contactTelephone
  await workbook.xlsx.writeFile(demande)
  //shell.openPath(dir)
  return dirOpp
})
