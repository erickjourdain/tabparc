import Users from '@renderer/components/admin/Users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/users')({
  component: () => <Users />
})
