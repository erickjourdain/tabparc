import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { FamilleInstrument } from '../entity/familleInstrument.entity'
import { loggedUser } from './login'

// Repository d'accès aux familles d'instrumnents
const familleInstrumentRepository = AppDataSource.getRepository(FamilleInstrument)

/**
 * Liste de famille d'instrumnents
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<FamilleInstrument[]> tableau de famille d'instrumnents
 */
const findAll = (filter: FindManyOptions<FamilleInstrument>) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  return familleInstrumentRepository.findAndCount(filter)
}

/**
 * Recherche de famille d'instrumnents
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @param search string chaine à rechercher
 * @returns Promise<FamilleInstrument[]> tableau d'instrumnents
 */
const search = (filter: FindManyOptions<FamilleInstrument>, search: string) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  filter.where = { nom: ILike(`%${search}%`) }
  return familleInstrumentRepository.findAndCount(filter)
}

/**
 * Recherche d'une famille d'instruments retourne null si famille non trouvée
 * @param id identifiant de la famille d'instrument recherchée
 * @returns Promise<FamilleInstrument> familleInstrument
 */
const findById = (id: number) => {
  return familleInstrumentRepository.findOneBy({ id })
}

/**
 * Mise à jour d'une famille d'instruments
 * @param familleInstrument famille d'instruments à mettre à jour
 * @returns Promise<FamilleInstrument>
 */
const update = async (familleInstrument: FamilleInstrument) => {
  return new Promise((resolve, reject) => {
    if (loggedUser?.role !== 'ADMIN')
      return reject(new Error('vous ne disposez pas des droits pour réaliser cette opération'))
    familleInstrumentRepository
      .update({ id: familleInstrument.id }, familleInstrument)
      .then((newFamilleInstrument) => {
        return resolve(newFamilleInstrument)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

/**
 * Sauvegarde d'une nouvelle famille d'instruments
 * @param familleInstrument famille d'instruments à enregistrer
 * @returns Promise<FamilleInstrument>
 */
const save = async (familleInstrument: FamilleInstrument) => {
  return new Promise((resolve, reject) => {
    if (loggedUser?.role !== 'ADMIN')
      return reject(new Error('vous ne disposez pas des droits pour réaliser cette opération'))
    familleInstrumentRepository
      .save(familleInstrument)
      .then((newFamilleInstrument) => {
        return resolve(newFamilleInstrument)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

export default { findById, findAll, save, search, update }
