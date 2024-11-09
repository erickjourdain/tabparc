import { platform } from 'os'
import { Opportunite } from '../type'

/**
 * Chemin du répertoire de l'opportunité
 * @param opp Opportunite
 * @returns string le chemin complet du répertoire GEC_DOCUMENT
 */
const oppPath = (opp: Opportunite) => {
  const year = opp.dateCreation.getFullYear()
  const month = opp.dateCreation.toLocaleDateString().substring(3, 5)
  const ref = opp.reference.substring(3, 10)

  const dir = `${import.meta.env.MAIN_VITE_GEC_PATH}/OPPORTUNITES/${year}/${month}/OPP_${ref}`

  return platform() === 'win32' ? dir.replace('/', '\\') : dir
}

export default { oppPath }
