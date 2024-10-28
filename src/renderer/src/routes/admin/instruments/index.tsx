import ListInstruments from '@renderer/components/admin/instruments/ListInstruments'
import { FindAndCount, Instrument } from '@renderer/type'
import settings from '@renderer/utils/settings'
import { createFileRoute } from '@tanstack/react-router'
import { FindManyOptions } from 'typeorm'
import { z } from 'zod'

// Schema des paramètres de la recherche
const formSearchSchema = z.object({
  page: z.optional(z.number()),
  search: z.optional(z.string())
})

// Définition du Type des éléments de recherche
type FormSearchSchema = z.infer<typeof formSearchSchema>

export const Route = createFileRoute('/admin/instruments/')({
  // Validation des paramètres de recherhce
  validateSearch: (search: Record<string, unknown>): FormSearchSchema =>
    formSearchSchema.parse(search),
  // Définition des paramètres de recherche
  loaderDeps: ({ search }) => ({
    page: search.page || 1,
    search: search.search || ''
  }),
  // Chargement des données correspondant aux paramètres de recherche
  loader: async ({ deps }): Promise<FindAndCount<Instrument>> => {
    const filter: FindManyOptions<Instrument> = {
      skip: (deps.page - 1) * settings.nbElements,
      take: settings.nbElements
    }
    let data
    if (deps.search.length) {
      data = await window.electronAPI.searchInstruments(filter, deps.search)
    } else {
      data = await window.electronAPI.getInstruments(filter)
    }
    return { data: data[0], nbData: data[1] }
  },
  // Composant à afficher
  component: () => <ListInstruments />
})