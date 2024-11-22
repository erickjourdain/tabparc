import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { Contact } from '../entity/contact.entity'
import { loggedUser } from './login'

// Repository d'accès aux contacts
const contactRepository = AppDataSource.getRepository(Contact)

/**
 * Liste des contacts
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<Contact[]> tableau d'contacts
 */
const findAll = (filter: FindManyOptions<Contact>) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  return contactRepository.findAndCount(filter)
}

/**
 * Recherche de contacts
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @param search string chaine à rechercher
 * @returns Promise<Contact[]>
 */
const search = (filter: FindManyOptions<Contact>, search: string) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  filter.where = [{ nom: ILike(`%${search}%`) }, { prenom: ILike(`%${search}%`) }]
  return contactRepository.findAndCount(filter)
}

/**
 * Recherche d'un contact retourne null si contact non trouvé
 * @param id identifiant de le contact recherché
 * @returns Promise<Contact>
 */
const findById = (id: number) => {
  return contactRepository.findOneBy({ id })
}

/**
 * Mise à jour d'un contact
 * @param contact Contact contact à mettre à jour
 * @returns Promise<Contact>
 */
const update = async (contact: Contact) => {
  return new Promise((resolve, reject) => {
    if (loggedUser?.role !== 'ADMIN')
      return reject(new Error('vous ne disposez pas des droits pour réaliser cette opération'))
    contactRepository
      .update({ id: contact.id }, contact)
      .then((newContact) => {
        return resolve(newContact)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

/**
 * Sauvegarde d'un nouvel contact
 * @param contact Contact contact à enregistrer
 * @returns Promise<Contact>
 */
const save = async (contact: Contact) => {
  return new Promise((resolve, reject) => {
    if (loggedUser?.role !== 'ADMIN')
      return reject(new Error('vous ne disposez pas des droits pour réaliser cette opération'))
    contactRepository
      .save(contact)
      .then((newContact) => {
        return resolve(newContact)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

export default { findById, findAll, save, search, update }
