import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { Grandeur } from '../entity/grandeur'

// Repository d'accès aux grandeurs
const grandeurRepository = AppDataSource.getRepository(Grandeur)

/**
 * Liste des grandeurs
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<Grandeurs[]> tableau d'contacts
 */
const findAll = (filter: FindManyOptions<Grandeur>) => {
  return grandeurRepository.findAndCount(filter)
}

/**
 * Recherche de grandeurs
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @param search string chaine à rechercher
 * @returns Promise<Grandeur[]> tableau de grandeurs
 */
const search = (filter: FindManyOptions<Grandeur>, search: string) => {
  filter.where = [{ nom: ILike(`%${search}%`) }, { nom: ILike(`%${search}%`) }]
  return grandeurRepository.findAndCount(filter)
}

/**
 * Recherche d'une grandeur retourne null si contact non trouvé
 * @param id identifiant de le grandeur recherché
 * @returns Promise<Grandeur>
 */
const findById = (id: number) => {
  return grandeurRepository.findOneBy({ id })
}

/**
 * Mise à jour d'une grandeur
 * @param Grandeur grandeur à mettre à jour
 * @returns Promise<Grandeur>
 */
const update = async (grandeur: Grandeur) => {
  return grandeurRepository.update({ id: grandeur.id }, grandeur)
}

/**
 * Sauvegarde d'une nouvelle grandeur
 * @param Grandeur grandeur à enregistrer
 * @returns Promise<Grandeur>
 */
const save = async (grandeur: Grandeur) => {
  return grandeurRepository.save(grandeur)
}

export default { findById, findAll, save, search, update }
