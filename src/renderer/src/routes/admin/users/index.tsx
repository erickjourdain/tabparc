import ListUsers from '@renderer/components/admin/users/ListUsers'
import { FindAndCount, User } from '@renderer/type'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/users/')({
  loader: async (): Promise<FindAndCount<User>> => {
    const data = await window.electronAPI.getUsers()
    return { data: data[0], nbdata: data[1] }
  },
  component: () => <ListUsers />
})
