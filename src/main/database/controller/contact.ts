import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { Contact } from '../entity/contact'

// Repository d'accès aux contacts
const contactRepository = AppDataSource.getRepository(Contact)

/**
 * Liste d'contacts
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<Contact[]> tableau d'contacts
 */
const findAll = (filter: FindManyOptions<Contact>) => {
  return contactRepository.findAndCount(filter)
}

/**
 * Recherche d'contacts
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @param search string chaine à rechercher
 * @returns Promise<Contact[]> tableau d'contacts
 */
const search = (filter: FindManyOptions<Contact>, search: string) => {
  filter.where = [{ nom: ILike(`%${search}%`) }, { prenom: ILike(`%${search}%`) }]
  return contactRepository.findAndCount(filter)
}

/**
 * Recherche d'un contact retourne null si contact non trouvé
 * @param id identifiant de l'contact recherché
 * @returns Promise<Contact> contact
 */
const findById = (id: number) => {
  return contactRepository.findOneBy({ id })
}

/**
 * Mise à jour d'un contact
 * @param Contact Contact contact à mettre à jour
 * @returns Promise<Contact>
 */
const update = async (Contact: Contact) => {
  return contactRepository.update({ id: Contact.id }, Contact)
}

/**
 * Sauvegarde d'un nouvel contact
 * @param Contact Contact contact à enregistrer
 * @returns Promise<Contact>
 */
const save = async (Contact: Contact) => {
  return contactRepository.save(Contact)
}

export default { findById, findAll, save, search, update }
