import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { Instrument } from '../entity/instrument'

// Repository d'accès aux instrumnents
const instrumentRepository = AppDataSource.getRepository(Instrument)

/**
 * Liste d'instrumnents
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<Instrument[]> tableau d'instrumnents
 */
const findAll = (filter: FindManyOptions<Instrument>) => {
  return instrumentRepository.findAndCount(filter)
}

/**
 * Recherche d'instrumnents
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @param search string chaine à rechercher
 * @returns Promise<Instrument[]> tableau d'instrumnents
 */
const search = (filter: FindManyOptions<Instrument>, search: string) => {
  filter.where = { nom: ILike(`%${search}%`) }
  return instrumentRepository.findAndCount(filter)
}

/**
 * Recherche d'un instrument retourne null si instrument non trouvée
 * @param id identifiant de l'instrument recherchée
 * @returns Promise<Instrument> instrument
 */
const findById = (id: number) => {
  return instrumentRepository.findOneBy({ id })
}

/**
 * Mise à jour d'un instrument
 * @param instrument instrument à mettre à jour
 * @returns Promise<instrument>
 */
const update = async (instrument: Instrument) => {
  return instrumentRepository.update({ id: instrument.id }, instrument)
}

/**
 * Sauvegarde d'un nouvel instrument
 * @param instrument instrument à enregistrer
 * @returns Promise<instrument>
 */
const save = async (instrument: Instrument) => {
  return instrumentRepository.save(instrument)
}

export default { findById, findAll, save, search, update }
