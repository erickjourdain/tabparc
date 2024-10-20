import NewLieu from '@renderer/components/admin/lieux/NewLieu'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/lieux/new')({
  component: () => <NewLieu />
})
