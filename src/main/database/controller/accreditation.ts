import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { Accreditation } from '../entity/accreditation'
import { loggedUser } from './login'

// Repository d'accès aux accreditations
const accreditationRepository = AppDataSource.getRepository(Accreditation)

/**
 * Liste d'accreditations
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<Accreditation[]> tableau d'accreditations
 */
const findAll = (filter: FindManyOptions<Accreditation>) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  return accreditationRepository.findAndCount(filter)
}

/**
 * Recherche d'accreditations
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @param search string chaine à rechercher
 * @returns Promise<Accreditation[]> tableau d'accreditations
 */
const search = (filter: FindManyOptions<Accreditation>, search: string) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  filter.where = { reference: ILike(`%${search}%`) }
  return accreditationRepository.findAndCount(filter)
}

/**
 * Recherche d'un accreditation retourne null si accreditation non trouvée
 * @param id identifiant de l'accreditation recherchée
 * @returns Promise<Accreditation> accreditation
 */
const findById = (id: number) => {
  return accreditationRepository.findOneBy({ id })
}

/**
 * Mise à jour d'un accreditation
 * @param accreditation Accreditation à mettre à jour
 * @returns Promise<Accreditation>
 */
const update = async (accreditation: Accreditation) => {
  return new Promise((resolve, reject) => {
    try {
      if (loggedUser?.role !== 'ADMIN')
        throw new Error('vous ne disposeez pas des droits pour réaliser cette opération', {
          cause: 'operation denied'
        })
      return resolve(accreditationRepository.update({ id: accreditation.id }, accreditation))
    } catch (error) {
      return reject(error)
    }
  })
}

/**
 * Sauvegarde d'un nouvel accreditation
 * @param accreditation Accreditation à enregistrer
 * @returns Promise<Accreditation>
 */
const save = async (accreditation: Accreditation) => {
  return new Promise((resolve, reject) => {
    try {
      if (loggedUser?.role !== 'ADMIN')
        throw new Error('vous ne disposeez pas des droits pour réaliser cette opération', {
          cause: 'operation denied'
        })
      return resolve(accreditationRepository.save(accreditation))
    } catch (error) {
      return reject(error)
    }
  })
}

export default { findById, findAll, save, search, update }
