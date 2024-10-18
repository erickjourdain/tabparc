import ListUsers from '@renderer/components/admin/users/ListUsers'
import { FindAndCount, User } from '@renderer/type'
import settings from '@renderer/utils/settings'
import { createFileRoute } from '@tanstack/react-router'
import { FindManyOptions, ILike } from 'typeorm'
import { z } from 'zod'

// Schema des paramètres de la recherche
const formSearchSchema = z.object({
  page: z.optional(z.number()),
  search: z.optional(z.string())
})

// Définition du Type des éléments de recherche
type FormSearchSchema = z.infer<typeof formSearchSchema>

export const Route = createFileRoute('/admin/users/')({
  validateSearch: (search: Record<string, unknown>): FormSearchSchema =>
    formSearchSchema.parse(search),
  loaderDeps: ({ search }) => ({
    page: search.page || 1,
    search: search.search || ''
  }),
  loader: async ({ deps }): Promise<FindAndCount<User>> => {
    const filter: FindManyOptions<User> = {
      skip: (deps.page - 1) * settings.nbElements,
      take: settings.nbElements
    }
    if (deps.search.length) {
      filter.where = [
        { nom: ILike(`%${deps.search}%`) },
        { prenom: ILike(`%${deps.search}%`) },
        { login: ILike(`%${deps.search}%`) }
      ]
    }
    console.log(filter)
    const data = await window.electronAPI.getUsers(filter)
    return { data: data[0], nbData: data[1] }
  },
  component: () => <ListUsers />
})
