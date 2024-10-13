import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/contacts')({
  component: () => <div>Liste des contacts</div>
})
