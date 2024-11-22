import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { loggedUser } from './login'
import crm from '../mssql/crm'
import { Demande } from '../entity/demande.entity'
import { Opportunite } from '@apptypes/*'

// Repository d'accès aux demandes
const demandeRepository = AppDataSource.getRepository(Demande)

/**
 * Liste des demandes
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<DemandeOpp[]> tableau des demandes
 */
const findAll = async (filter: FindManyOptions<Demande>) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  return demandeRepository.findAndCount(filter)
}

/**
 * Recherche de demandes
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @param search string chaine à rechercher
 * @returns Promise<DemandeOpp[]> tableau des demandes
 */
const search = async (filter: FindManyOptions<Demande>, search: string) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  filter.where = [{ refOpportunite: ILike(`%${search}%`) }, { client: ILike(`%${search}%`) }]
  return demandeRepository.findAndCount(filter)
}

/**
 * Recherche d'une demande via son opportunité
 * @param refOpp référence de l'opportunité
 * @param withOpportunitye booleen indiquant l'opportunité associée doit être retournée (défaut = false)
 * @returns Promise objet contenant la demande et l'opportunité corrrespondante
 */
const findByOpportunite = async (
  refOpp: string,
  withOpportunitye = true
): Promise<{ demande: Demande | null; opportunite: Opportunite | null }> => {
  const demande = await demandeRepository.findOne({
    where: { refOpportunite: refOpp }
  })
  if (demande === null)
    return {
      demande,
      opportunite: null
    }
  if (withOpportunitye)
    return {
      demande,
      opportunite: await crm.rechercheOpportunite(demande.refOpportunite)
    }
  else
    return {
      demande,
      opportunite: null
    }
}

/**
 * Recherche d'une demande
 * @param id identifiant de la demande recherchée
 * @returns Promise<Demande> demande
 */
const findById = async (id: number) => {
  return demandeRepository.findOneByOrFail({ id })
}

/**
 * Sauvegarde d'une nouvelle demande
 * @param demande Demande demande à enregistrer
 * @returns Promise<Demand>
 */
const save = async (demande: Demande) => {
  return new Promise((resolve, reject) => {
    if (loggedUser?.role !== 'ADMIN' && loggedUser?.role !== 'COMMERCIAL')
      return reject(new Error('vous ne disposez pas des droits pour réaliser cette opération'))
    demandeRepository
      .save(demande)
      .then((newDemande) => {
        return resolve(newDemande)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

/**
 * Mise à jour d'une demande
 * @param demande Demande demande à mettre à jour
 * @returns Promise<Demande>
 */
const update = async (demande: Demande) => {
  return new Promise((resolve, reject) => {
    if (loggedUser?.role !== 'ADMIN' && loggedUser?.role !== 'COMMERCIAL')
      return reject(new Error('vous ne disposez pas des droits pour réaliser cette opération'))
    demandeRepository
      .save(demande)
      .then((newDemande) => {
        return resolve(newDemande)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

export default { findById, findByOpportunite, findAll, save, search, update }
