import { FindManyOptions } from 'typeorm'
import AppDataSource from '../data-source'
import { User } from '../entity/user'

// Repository d'accès aux utilisateurs
const userRepository = AppDataSource.getRepository(User)

/**
 * Recherche d'utilisateurs
 *
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<User[]> tableau d'utilisateurs
 */
const findUsers = (filter?: FindManyOptions<User>) => {
  return userRepository.find(filter)
}

const countUsers = (filter?: FindManyOptions<User>) => {
  return userRepository.count(filter)
}

export { countUsers, findUsers }
