import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { loggedUser } from './login'
import { Section } from '../entity/section.entity'

// Repository d'accès aux sections
const sectionRepository = AppDataSource.getRepository(Section)

/**
 * Liste des sections
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<Section[]> tableau de sections
 */
const findAll = (filter: FindManyOptions<Section>) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  return sectionRepository.findAndCount(filter)
}

/**
 * Recherche de sections
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @param search string chaine à rechercher
 * @returns Promise<Section[]> tableau de sections
 */
const search = (filter: FindManyOptions<Section>, search: string) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  filter.where = [{ reference: parseInt(search) }, { label: ILike(`%${search}%`) }]
  return sectionRepository.findAndCount(filter)
}

/**
 * Recherche d'une section retourne null si section non trouvé
 * @param id identifiant de la section recherchée
 * @returns Promise<Section> section
 */
const findById = (id: number) => {
  return sectionRepository.findOneBy({ id })
}

/**
 * Mise à jour d'une section
 * @param section Section à mettre à jour
 * @returns Promise<Section>
 */
const update = async (section: Section) => {
  return new Promise((resolve, reject) => {
    try {
      if (loggedUser?.role !== 'ADMIN')
        throw new Error('vous ne disposeez pas des droits pour réaliser cette opération', {
          cause: 'operation denied'
        })
      return resolve(sectionRepository.update({ id: section.id }, section))
    } catch (error) {
      return reject(error)
    }
  })
}

/**
 * Sauvegarde d'une nouvelle section
 * @param section Section à enregistrer
 * @returns Promise<Section>
 */
const save = async (section: Section) => {
  return new Promise((resolve, reject) => {
    try {
      if (loggedUser?.role !== 'ADMIN')
        throw new Error('vous ne disposeez pas des droits pour réaliser cette opération', {
          cause: 'operation denied'
        })
      return resolve(sectionRepository.save(section))
    } catch (error) {
      return reject(error)
    }
  })
}

export default { findById, findAll, save, search, update }
