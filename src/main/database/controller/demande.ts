import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { loggedUser } from './login'
import crm from '../mssql/crm'
import { DemandeOpp } from 'src/main/type'
import { Demande } from '../entity/demande.entity'

// Repository d'accès aux demandes
const demandeRepository = AppDataSource.getRepository(Demande)

/**
 * Liste des demandes
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<DemandeOpp[]> tableau des demandes
 */
const findAll = async (filter: FindManyOptions<Demande>) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  const [data, count] = await demandeRepository.findAndCount(filter)
  const demandes: DemandeOpp[] = []
  for (let i = 0; i < data.length; i++) {
    demandes.push({
      id: data[i].id,
      statut: data[i].statut,
      codeClient: data[i].codeClient,
      client: data[i].client,
      createur: data[i].createur,
      gestionnaire: data[i].gestionnaire,
      createdAt: data[i].createdAt,
      updatedAt: data[i].updatedAt,
      opportunite: await crm.rechercheOpportunite(data[i].refOpportunite)
    })
  }
  return [demandes, count]
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
  const [data, count] = await demandeRepository.findAndCount(filter)
  const demandes: DemandeOpp[] = []
  for (let i = 0; i < data.length; i++) {
    demandes.push({
      id: data[i].id,
      statut: data[i].statut,
      codeClient: data[i].codeClient,
      client: data[i].client,
      createur: data[i].createur,
      gestionnaire: data[i].gestionnaire,
      createdAt: data[i].createdAt,
      updatedAt: data[i].updatedAt,
      opportunite: await crm.rechercheOpportunite(data[i].refOpportunite)
    })
  }
  return [demandes, count]
}

/**
 * Recherche d'une demande via son opportunité
 * @param refOpp référence de l'opportunité
 * @param withOpportunitye booléen definissant l'association à l'opportunité (défaut = false)
 * @returns Promise<DemandeOpp> demande
 */
const findByOpportunite = async (
  refOpp: string,
  withOpportunitye = true
): Promise<DemandeOpp | Demande | null> => {
  const demande = await demandeRepository.findOne({
    where: { refOpportunite: refOpp }
  })
  if (demande === null) return null
  if (withOpportunitye)
    return {
      id: demande.id,
      statut: demande.statut,
      createur: demande.createur,
      codeClient: demande.codeClient,
      client: demande.client,
      gestionnaire: demande.gestionnaire,
      createdAt: demande.createdAt,
      updatedAt: demande.updatedAt,
      opportunite: await crm.rechercheOpportunite(demande.refOpportunite)
    }
  else return demande
}

/**
 * Recherche d'une demande
 * @param id identifiant de la demande recherchée
 * @returns Promise<DemandeOpp> demande
 */
const findById = async (id: number) => {
  const demande = await demandeRepository.findOneByOrFail({ id })
  return {
    id: demande.id,
    statut: demande.statut,
    codeClient: demande.codeClient,
    client: demande.client,
    createur: demande.createur,
    gestionnaire: demande.gestionnaire,
    createdAt: demande.createdAt,
    updatedAt: demande.updatedAt,
    opportunite: await crm.rechercheOpportunite(demande.refOpportunite)
  }
}

/**
 * Sauvegarde d'une nouvelle demande
 * @param demande Demande demande à enregistrer
 * @returns Promise<DemandeOpp>
 */
const save = async (demande: Demande) => {
  return new Promise((resolve, reject) => {
    try {
      if (loggedUser?.role !== 'ADMIN' && loggedUser?.role !== 'COMMERCIAL')
        throw new Error('vous ne disposeez pas des droits pour réaliser cette opération', {
          cause: 'operation denied'
        })
      return resolve(demandeRepository.save(demande))
    } catch (error) {
      return reject(error)
    }
  })
}

/**
 * Mise à jour d'une demande
 * @param demande Demande demande à mettre à jour
 * @returns Promise<DemandeOpp>
 */
const update = async (demande: Demande) => {
  return new Promise((resolve, reject) => {
    try {
      if (loggedUser?.role !== 'ADMIN' && loggedUser?.role !== 'COMMERCIAL')
        throw new Error('vous ne disposeez pas des droits pour réaliser cette opération', {
          cause: 'operation denied'
        })
      return resolve(demandeRepository.save(demande))
    } catch (error) {
      return reject(error)
    }
  })
}

export default { findById, findByOpportunite, findAll, save, search, update }
