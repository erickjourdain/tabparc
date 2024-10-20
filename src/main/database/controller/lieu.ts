import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { Lieu } from '../entity/lieu'

// Repository d'accès aux lieux
const lieuRepository = AppDataSource.getRepository(Lieu)

/**
 * Liste d'lieux
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<Lieu[]> tableau d'lieux
 */
const findAll = (filter: FindManyOptions<Lieu>) => {
  return lieuRepository.findAndCount(filter)
}

/**
 * Recherche de lieux
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @param search string chaine à rechercher
 * @returns Promise<Lieu[]> tableau d'lieux
 */
const search = (filter: FindManyOptions<Lieu>, search: string) => {
  filter.where = [{ site: ILike(`%${search}%`) }, { section: ILike(`%${search}%`) }]
  return lieuRepository.findAndCount(filter)
}

/**
 * Recherche d'un lieu retourne null si lieu non trouvé
 * @param id identifiant de l'lieu recherché
 * @returns Promise<Lieu> lieu
 */
const findById = (id: number) => {
  return lieuRepository.findOneBy({ id })
}

/**
 * Mise à jour d'un lieu
 * @param lieu identifiant du lieu à mettre à jour
 * @returns Promise<Lieu>
 */
const update = async (lieu: Lieu) => {
  return lieuRepository.update({ id: lieu.id }, lieu)
}

/**
 * Sauvegarde d'un nouvel lieu
 * @param lieu identifiant du lieu à enregistrer
 * @returns Promise<Lieu>
 */
const save = async (lieu: Lieu) => {
  return lieuRepository.save(lieu)
}

export default { findById, findAll, save, search, update }
