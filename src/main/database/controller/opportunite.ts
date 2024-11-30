import { FindManyOptions, ILike } from 'typeorm'
import AppDataSource from '../data-source'
import { loggedUser } from './login'
import crm from '../mssql/crm'
import { Opportunite } from '../entity/opportunite.entity'
import { OpportuniteCRM } from '@apptypes/*'

// Repository d'accès aux opportunites
const opportuniteRepository = AppDataSource.getRepository(Opportunite)

/**
 * Liste des Opportunites
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @returns Promise<OpportuniteOpp[]> tableau des opportunites
 */
const findAll = async (filter: FindManyOptions<Opportunite>) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  return opportuniteRepository.findAndCount(filter)
}

/**
 * Recherche de opportunites
 * @param filter FindManyOptions objet définissant les paramètres de la requête
 * @param search string chaine à rechercher
 * @returns Promise<Opportunite[]> tableau des opportunites
 */
const search = async (filter: FindManyOptions<Opportunite>, search: string) => {
  filter.take = filter.take || import.meta.env.MAIN_VITE_MAX_ITEMS
  filter.where = [{ refOpportunite: ILike(`%${search}%`) }, { client: ILike(`%${search}%`) }]
  return opportuniteRepository.findAndCount(filter)
}

/**
 * Recherche d'une opportunite via s a référence CRM
 * @param refOpp référence de l'opportunité
 * @param withOpportunitye booleen indiquant l'opportunité associée doit être retournée (défaut = false)
 * @returns Promise contenant l'opportunite et le contenu de celle du CRM
 */
const findByOpportunite = async (
  refOpp: string,
  withOpportunitye = true
): Promise<{ opportunite: Opportunite | null; opportuniteCRM: OpportuniteCRM | null }> => {
  const opportunite = await opportuniteRepository.findOne({
    where: { refOpportunite: refOpp }
  })
  if (opportunite === null)
    return {
      opportunite,
      opportuniteCRM: null
    }
  if (withOpportunitye)
    return {
      opportunite,
      opportuniteCRM: await crm.rechercheOpportunite(opportunite.refOpportunite)
    }
  else
    return {
      opportunite,
      opportuniteCRM: null
    }
}

/**
 * Recherche d'une Opportunite
 * @param id identifiant de la Opportunite recherchée
 * @returns Promise<Opportunite> Opportunite
 */
const findById = async (id: number) => {
  return opportuniteRepository.findOneByOrFail({ id })
}

/**
 * Sauvegarde d'une nouvelle Opportunite
 * @param Opportunite Opportunite Opportunite à enregistrer
 * @returns Promise<Demand>
 */
const save = async (Opportunite: Opportunite) => {
  return new Promise((resolve, reject) => {
    if (loggedUser?.role !== 'ADMIN' && loggedUser?.role !== 'COMMERCIAL')
      return reject(new Error('vous ne disposez pas des droits pour réaliser cette opération'))
    opportuniteRepository
      .save(Opportunite)
      .then((newOpportunite) => {
        return resolve(newOpportunite)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

/**
 * Mise à jour d'une Opportunite
 * @param Opportunite Opportunite Opportunite à mettre à jour
 * @returns Promise<Opportunite>
 */
const update = async (Opportunite: Opportunite) => {
  return new Promise((resolve, reject) => {
    if (loggedUser?.role !== 'ADMIN' && loggedUser?.role !== 'COMMERCIAL')
      return reject(new Error('vous ne disposez pas des droits pour réaliser cette opération'))
    opportuniteRepository
      .save(Opportunite)
      .then((newOpportunite) => {
        return resolve(newOpportunite)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

export default { findById, findByOpportunite, findAll, save, search, update }
