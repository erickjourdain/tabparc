import mssql, { ConnectionPool } from 'mssql'
import { Client, DataCRM, Opportunite, Prestation } from 'src/main/type'

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
      return [resData.recordset, resCount.recordset[0].NBVAL]
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
      return [resData.recordset, resCount.recordset[0].NBVAL]
    } else return null
  } catch (error) {
    console.log(error)
    return null
  }
}

const rechercheOpportunite = async (opp: string): Promise<Opportunite | null> => {
  try {
    if (pool) {
      const queryData = `select
        aff.AF_CODE code,
        aff.AF_IDENT_PROP reference,
        aff.AF_INFO_COMP23 titre,
        aff.AF_DATE_CREA dateCreation,
        cl.CLIENT client,
        cl.REFERENCE codeClient,
        cont.NOM contactNom,
        cont.PRENOM contactPrenom,
        cont.CL_TEL contactTelephone,
        cont.VILLE contactVille,
        cont.CO_CODE contactPays,
        cont.CL_EMAIL contactEmail,
        t9.T9_LIB statut
        from LNE.AFFAIRES aff
        inner join LNE.CLIENTS cl on cl.REFERENCE = aff.REFERENCE
        inner join LNE.ENTITY_LINK entl on
          entl.EL_CODE_SRC = aff.AF_CODE
          and entl.EL_SRC = 'AFFAIRES'
          and entl.EL_DEST = 'CLIENTS'
          and entl.TLI_CODE = 527
        inner join LNE.CLIENTS cont on cont.REFERENCE = entl.EL_CODE_DEST
        inner join LNE.TABLE9 t9 on t9.T9_CODE = aff.T9_CODE
        where aff.UN_CODE = -307
        and aff.AF_IDENT_PROP = @opp;
      `
      const resData: mssql.IResult<Opportunite> = await pool
        .request()
        .input('opp', mssql.VarChar(50), opp)
        .query(queryData)
      console.log(resData)
      return resData.rowsAffected[0] === 1 ? resData.recordset[0] : null
    } else return null
  } catch (error) {
    console.log(error)
    return null
  }
}

export default { connexion, deconnexion, recherchePresta, rechercheClient, rechercheOpportunite }
