import NewContact from '@renderer/components/admin/contacts/NewContact'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/contacts/new')({
  component: () => <NewContact />
})
