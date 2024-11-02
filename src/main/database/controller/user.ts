import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { User } from '../entity/user'
import { loggedUser } from './login'

// Repository d'accès aux utilisateurs
const userRepository = AppDataSource.getRepository(User)

/**
 * Liste d'utilisateurs
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<User[]> tableau d'utilisateurs
 */
const findAll = (filter: FindManyOptions<User>) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  return userRepository.findAndCount(filter)
}

/**
 * Recherche d'utilisateurs
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @param search string chaine à rechercher
 * @returns Promise<User[]> tableau d'utilisateurs
 */
const search = (filter: FindManyOptions<User>, search: string) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  filter.where = [
    { nom: ILike(`%${search}%`) },
    { prenom: ILike(`%${search}%`) },
    { login: ILike(`%${search}%`) }
  ]
  return userRepository.findAndCount(filter)
}

/**
 * Recherche d'un utilisateur retourne null si utilisateur non trouvé
 * @param id identifiant de l'utilisateur recherché
 * @returns Promise<User> utilisateur
 */
const findById = (id: number) => {
  return userRepository.findOneBy({ id })
}

/**
 * Recherche d'un utilisateur via son login
 * @param login identifiant de l'utilisateur connecté
 * @returns Promise<User> utilisateur
 */
const findByLogin = (login: string) => {
  return userRepository.findOneOrFail({ where: { login: ILike(login) } })
}

/**
 * Mise à jour d'un utilisateur
 * @param user User utilisateur à mettre à jour
 * @returns Promise<User>
 */
const update = async (user: User) => {
  return new Promise((resolve, reject) => {
    try {
      if (loggedUser?.role !== 'ADMIN')
        throw new Error('vous ne disposeez pas des droits pour réaliser cette opération', {
          cause: 'operation denied'
        })
      return resolve(userRepository.update({ id: user.id }, user))
    } catch (error) {
      return reject(error)
    }
  })
}

/**
 * Sauvegarde d'un nouvel utilisateur
 * @param user User utilisateur à enregistrer
 * @returns Promise<User>
 */
const save = async (user: User) => {
  return new Promise((resolve, reject) => {
    try {
      if (loggedUser?.role !== 'ADMIN')
        throw new Error('vous ne disposeez pas des droits pour réaliser cette opération', {
          cause: 'operation denied'
        })
      return resolve(userRepository.save(user))
    } catch (error) {
      return reject(error)
    }
  })
}

export default { findById, findByLogin, findAll, save, search, update }
