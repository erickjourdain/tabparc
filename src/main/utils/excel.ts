import Exceljs from 'exceljs'

/**
 * Détermination de la valeur d'une cellule au format date
 * @param cell Exceljs.Cell cellule à traiter
 * @returns Promise<Date> promise contenant la date
 */
const getDatevalue = (cell: Exceljs.Cell): Promise<Date> => {
  return new Promise((resolve, reject) => {
    if (cell.style.numFmt !== 'mm-dd-yy')
      return reject(new Error(`cellule ${cell.address} format inconnu`))
    switch (cell.type) {
      case 4:
        return resolve(cell.value as Date)
      case 6:
        return resolve(cell.result as Date)
      default:
        return reject(new Error(`cellule ${cell.address} format inconnu`))
    }
  })
}

/**
 * Détermination de la valeur d'une cellule au format chaine de caractères
 * @param cell Exceljs.Cell cellule à traiter
 * @returns Promise<Date> promise contenant la chaine de caractères
 */
const getStringValue = (cell: Exceljs.Cell): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    switch (cell.type) {
      case 0:
        return resolve(null)
      case 3:
        return resolve(cell.value as string)
      case 5:
        return resolve(cell.text as string)
      case 6:
        return resolve(cell.result as string)
      default:
        return reject(new Error(`cellule ${cell.address} format inconnu`))
    }
  })
}

export { getDatevalue, getStringValue }
