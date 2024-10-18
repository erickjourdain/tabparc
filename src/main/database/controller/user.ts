import { FindManyOptions } from 'typeorm'
import AppDataSource from '../data-source'
import { User } from '../entity/user'

// Repository d'accès aux utilisateurs
const userRepository = AppDataSource.getRepository(User)

/**
 * Liste d'utilisateurs
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<User[]> tableau d'utilisateurs
 */
const findAll = (filter: FindManyOptions<User>) => {
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
const findByName = (login: string) => {
  return userRepository.findOneBy({ login })
}

/**
 * Mise à jour d'un utilisateur
 * @param user User utilisateur à mettre à jour
 * @returns Promise<User>
 */
const update = async (user: User) => {
  return userRepository.update({ id: user.id }, user)
}

/**
 * Sauvegarde d'un nouvel utilisateur
 * @param user User utilisateur à enregistrer
 * @returns Promise<User>
 */
const save = async (user: User) => {
  return userRepository.save(user)
}

export default { findById, findByName, findAll, save, update }
