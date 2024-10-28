import mssql, { ConnectionPool } from 'mssql'
import { Client, DataCRM, Prestation } from 'src/main/type'

const config: mssql.config = {
  user: import.meta.env.MAIN_VITE_CRM_USER,
  password: import.meta.env.MAIN_VITE_CRM_PWD,
  server: import.meta.env.MAIN_VITE_CRM_SERVER,
  database: import.meta.env.MAIN_VITE_CRM_DB,
  options: {
    trustServerCertificate: true
  }
}

let pool: ConnectionPool | null

/**
 * Connexion à la base de donnée du CRM
 */
const connexion = async () => {
  try {
    pool = await mssql.connect(config)
    console.log('connexion à la base de données CRM effectuée')
  } catch (error) {
    console.log(error)
    pool = null
    process.exit(0)
  }
}

/**
 * Fermeture de la connexion au CRM
 */
const deconnexion = () => {
  if (pool) pool.close()
  console.log('déconnexion de la base de données CRM effectuée')
}

/**
 * Recherche de prestations dans le catalogue métrologie
 * @param search string chaine à rechercher dans le code ou la description
 * @param page number le numéro de la page à renvoyer
 * @param size number le nombre d'éléments à renvoyer
 * @returns Promise nombre d'éléments total et éléments correspondant à la pagination
 */
const recherchePresta = async (
  search: string,
  page: number,
  size: number
): Promise<DataCRM<Prestation> | null> => {
  try {
    if (pool) {
      const queryData = `select
        prod.T3_LIB code,
        prod.T3_DESC_1 description,
        prod.T3_INFO_STR01 activite,
        prod.T3_INFO_STR02 sousActivité,
        prod.T3_INFO_STR03 section,
        prix.PR_VALUE prix
        from LNE.TABLE3 prod
        left join LNE.PRICE prix on prix.T3_CODE = prod.T3_CODE
        where prod.T3_APPART = -89
        and prod.T3_CODE > 0
        and (
          prod.T3_LIB like @search
          or prod.T3_DESC_1 like @search
        )
        order by prod.T3_CODE
        offset @offset rows fetch next @size rows only;`
      const resData = await pool
        .request()
        .input('offset', mssql.Int(), (page - 1) * size)
        .input('size', mssql.Int, size > 50 ? 50 : size)
        .input('search', mssql.VarChar(50), `%${search}%`)
        .query(queryData)
      const queryCount = ` select
        count(prod.T3_LIB) NBVAL
        from LNE.TABLE3 prod
        where prod.T3_APPART = -89
        and prod.T3_CODE > 0
        and (
          prod.T3_LIB like @search
          or prod.T3_DESC_1 like @search
        );`
      const resCount = await pool
        .request()
        .input('search', mssql.VarChar(50), `%${search}%`)
        .query(queryCount)
      return [resCount.recordset[0].NBVAL, resData.recordset]
    } else return null
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Recherche des clients correspondant à la chaine de recherche
 * @param search string chaine à rechercher dans le compte tiers ou la raison sociale
 * @param page number le numéro de la page à renvoyer
 * @param size number le nombre d'éléments à renvoyer
 * @returns Promise nombre d'éléments total et éléments correspondant à la pagination
 */
const rechercheClient = async (
  search: string,
  page: number,
  size: number
): Promise<DataCRM<Client> | null> => {
  try {
    if (pool) {
      const queryData = ` select
        cl.REFERENCE reference,
        cl.CL_INFO_COMP22 compteTiers,
        cl.CLIENT raisonSociale,
        cl.ADRESSE adresse,
        cl.CODE_POSTAL codePostal,
        cl.CL_TEL telephone,
        cl.VILLE ville,
        cl.CO_CODE pays
        from LNE.CLIENTS cl
        where cl.UN_CODE = -300
        and (
          cl.CL_INFO_COMP22 like @search
          or cl.CLIENT like @search
        )
        order by cl.REFERENCE
        offset @offset rows fetch next @size rows only;`
      const resData = await pool
        .request()
        .input('offset', mssql.Int(), (page - 1) * size)
        .input('size', mssql.Int, size > 50 ? 50 : size)
        .input('search', mssql.VarChar(50), `%${search}%`)
        .query(queryData)
      const queryCount = ` select
        count(cl.REFERENCE) NBVAL
        from LNE.CLIENTS cl
        where cl.UN_CODE = -300
        and (
          cl.CL_INFO_COMP22 like @search
          or cl.CLIENT like @search
        );`
      const resCount = await pool
        .request()
        .input('search', mssql.VarChar(50), `%${search}%`)
        .query(queryCount)
      return [resCount.recordset[0].NBVAL, resData.recordset]
    } else return null
  } catch (error) {
    console.log(error)
    return null
  }
}

export default { connexion, deconnexion, recherchePresta, rechercheClient }
