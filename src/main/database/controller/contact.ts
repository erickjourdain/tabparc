import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { Contact } from '../entity/contact'

// Repository d'accès aux contacts
const contactRepository = AppDataSource.getRepository(Contact)

/**
 * Liste des contacts
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<Contact[]> tableau d'contacts
 */
const findAll = (filter: FindManyOptions<Contact>) => {
  return contactRepository.findAndCount(filter)
}

/**
 * Recherche de contacts
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @param search string chaine à rechercher
 * @returns Promise<Contact[]>
 */
const search = (filter: FindManyOptions<Contact>, search: string) => {
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
  return contactRepository.update({ id: contact.id }, contact)
}

/**
 * Sauvegarde d'un nouvel contact
 * @param contact Contact contact à enregistrer
 * @returns Promise<Contact>
 */
const save = async (contact: Contact) => {
  return contactRepository.save(contact)
}

export default { findById, findAll, save, search, update }
