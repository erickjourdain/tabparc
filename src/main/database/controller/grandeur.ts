import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { Grandeur } from '../entity/grandeur.entity'
import { loggedUser } from './login'

// Repository d'accès aux grandeurs
const grandeurRepository = AppDataSource.getRepository(Grandeur)

/**
 * Liste des grandeurs
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<Grandeurs[]> tableau des grandeurs
 */
const findAll = (filter: FindManyOptions<Grandeur>, relations?: string[]) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  if (relations) {
    filter.relations = {}
    for (let i = 0; i < relations.length; i++) {
      filter.relations[relations[i]] = true
    }
  }
  return grandeurRepository.findAndCount(filter)
}

/**
 * Recherche de grandeurs
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @param search string chaine à rechercher
 * @returns Promise<Grandeur[]> tableau de grandeurs
 */
const search = (filter: FindManyOptions<Grandeur>, search: string, relations?: string[]) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  filter.where = [{ nom: ILike(`%${search}%`) }, { nom: ILike(`%${search}%`) }]
  if (relations) {
    filter.relations = {}
    for (let i = 0; i < relations.length; i++) {
      filter.relations[relations[i]] = true
    }
  }
  return grandeurRepository.findAndCount(filter)
}

/**
 * Recherche d'une grandeur retourne null si contact non trouvé
 * @param id identifiant de le grandeur recherché
 * @returns Promise<Grandeur>
 */
const findById = (id: number, relations?: string[]) => {
  const filter = {
    where: { id },
    relations: {}
  }
  if (relations) {
    for (let i = 0; i < relations.length; i++) {
      filter.relations[relations[i]] = true
    }
  }
  return grandeurRepository.findOne(filter)
}

/**
 * Mise à jour d'une grandeur
 * @param Grandeur grandeur à mettre à jour
 * @returns Promise<Grandeur>
 */
const update = async (grandeur: Grandeur) => {
  return new Promise((resolve, reject) => {
    try {
      if (loggedUser?.role !== 'ADMIN')
        throw new Error('vous ne disposeez pas des droits pour réaliser cette opération', {
          cause: 'operation denied'
        })
      return resolve(grandeurRepository.save(grandeur))
    } catch (error) {
      return reject(error)
    }
  })
}

/**
 * Sauvegarde d'une nouvelle grandeur
 * @param Grandeur grandeur à enregistrer
 * @returns Promise<Grandeur>
 */
const save = async (grandeur: Grandeur) => {
  return new Promise((resolve, reject) => {
    try {
      if (loggedUser?.role !== 'ADMIN')
        throw new Error('vous ne disposeez pas des droits pour réaliser cette opération', {
          cause: 'operation denied'
        })
      return resolve(grandeurRepository.save(grandeur))
    } catch (error) {
      return reject(error)
    }
  })
}

export default { findById, findAll, save, search, update }
