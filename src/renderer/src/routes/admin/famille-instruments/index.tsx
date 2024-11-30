import { FamilleInstrument } from '@apptypes/index'
import ListParamsData from '@renderer/components/admin/ListParamsData'
import ErrorComponent from '@renderer/components/ErrorComponent'
import { FindAndCount } from '@renderer/type'
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
const ListFamilleInstruments = () => {
  // Hook du loader de la route
  const loader: FindAndCount<FamilleInstrument> = useLoaderData({
    from: '/admin/famille-instruments/'
  })

  const [data, setData] = useState<Data[]>([])

  useEffect(() => {
    const values = loader.data.map((val) => {
      return {
        id: val.id,
        nom: val.nom,
        valide: val.valide
      }
    })
    setData(values)
  }, [loader])

  return (
    <ListParamsData
      route="/admin/famille-instruments"
      type="familles d'instruments"
      data={data}
      nbData={loader.nbData}
    />
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/famille-instruments/')({
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
    return await loadData({
      page: deps.page,
      search: deps.search,
      route: 'famille-instrument'
    })
  },
  // Affichage du composant d'erreur de chargement
  errorComponent: ({ error }) => {
    return (
      <ErrorComponent
        error={error}
        message="Impossible de charger l'index des familles d'instruments"
      />
    )
  },
  // Composant à afficher
  component: () => <ListFamilleInstruments />
})
