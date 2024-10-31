import { Opportunite } from '../type'

const oppPath = (opp: Opportunite) => {
  const year = opp.dateCreation.getFullYear()
  const month = opp.dateCreation.toLocaleDateString().substring(3, 5)
  const ref = opp.reference.substring(3, 10)

  return `${import.meta.env.MAIN_VITE_GEC_PATH}/OPPORTUNITES/${year}/${month}/OPP_${ref}`
}

export default { oppPath }
