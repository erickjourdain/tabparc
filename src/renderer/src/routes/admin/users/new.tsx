import NewUser from '@renderer/components/admin/users/NewUser'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/users/new')({
  component: () => <NewUser />
})
