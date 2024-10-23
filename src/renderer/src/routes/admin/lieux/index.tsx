import ListParamsData from '@renderer/components/admin/ListParamsData'
import { FindAndCount, Lieu } from '@renderer/type'
import loadData from '@renderer/utils/loader/admin'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { z } from 'zod'

// Schema des paramètres de la recherche
const formSearchSchema = z.object({
  page: z.optional(z.number()),
  search: z.optional(z.string())
})

// Définition du Type des éléments de recherche
type FormSearchSchema = z.infer<typeof formSearchSchema>

// Interface de transfert des donnée vers le composant ListParamsData
interface Data {
  id: number | undefined
  [key: string]: string | number | boolean | undefined
}

/**
 * Composants de présentation des données
 * @returns JSX
 */
const ListLieux = () => {
  // Hook du loader de la route
  const loader: FindAndCount<Lieu> = useLoaderData({ from: '/admin/lieux/' })

  const [data, setData] = useState<Data[]>([])

  useEffect(() => {
    const values = loader.data.map((val) => {
      return {
        id: val.id,
        site: val.site,
        section: val.section
      }
    })
    setData(values)
  }, [loader])

  return <ListParamsData route="/admin/lieux" type="lieux" data={data} nbData={loader.nbData} />
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/lieux/')({
  // Validation des paramètres de recherhce
  validateSearch: (search: Record<string, unknown>): FormSearchSchema =>
    formSearchSchema.parse(search),
  // Définition des paramètres de recherche
  loaderDeps: ({ search }) => ({
    page: search.page || 1,
    search: search.search || ''
  }),
  // Chargement des données correspondant aux paramètres de recherche
  loader: async ({ deps }) => {
    return await loadData({ page: deps.page, search: deps.search, route: 'lieu' })
  },
  // Composant à afficher
  component: () => <ListLieux />
})
