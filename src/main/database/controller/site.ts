import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { Site } from '../entity/site.entity'
import { loggedUser } from './login'

// Repository d'accès aux sites
const siteRepository = AppDataSource.getRepository(Site)

/**
 * Liste des sites
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<Site[]> tableau de sites
 */
const findAll = (filter: FindManyOptions<Site>) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  return siteRepository.findAndCount(filter)
}

/**
 * Recherche de sites
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @param search string chaine à rechercher
 * @returns Promise<Site[]> tableau de sites
 */
const search = (filter: FindManyOptions<Site>, search: string) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  filter.where = { nom: ILike(`%${search}%`) }
  return siteRepository.findAndCount(filter)
}

/**
 * Recherche d'un site retourne null si site non trouvé
 * @param id identifiant du site recherché
 * @returns Promise<Site> site
 */
const findById = (id: number) => {
  return siteRepository.findOneBy({ id })
}

/**
 * Mise à jour d'un site
 * @param site Site à mettre à jour
 * @returns Promise<Site>
 */
const update = async (site: Site) => {
  return new Promise((resolve, reject) => {
    if (loggedUser?.role !== 'ADMIN')
      return reject(new Error('vous ne disposez pas des droits pour réaliser cette opération'))
    siteRepository
      .update({ id: site.id }, site)
      .then((newite) => {
        return resolve(newite)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

/**
 * Sauvegarde d'un nouveau site
 * @param site Site à enregistrer
 * @returns Promise<Site>
 */
const save = async (site: Site) => {
  return new Promise((resolve, reject) => {
    if (loggedUser?.role !== 'ADMIN')
      return reject(new Error('vous ne disposez pas des droits pour réaliser cette opération'))
    siteRepository
      .save(site)
      .then((newite) => {
        return resolve(newite)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

export default { findById, findAll, save, search, update }
