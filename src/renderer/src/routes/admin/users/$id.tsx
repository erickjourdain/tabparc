import ShowUser from '@renderer/components/admin/users/ShowUser'
import { User } from '@renderer/type'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/users/$id')({
  loader: async ({ params }): Promise<User | null> => {
    if (Number.isNaN(parseInt(params.id))) return null
    const user = await window.electronAPI.getUser(parseInt(params.id))
    return user
  },
  component: () => <ShowUser />
})
