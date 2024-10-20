import NewAccreditation from '@renderer/components/admin/accreditations/NewAccreditation'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/accreditations/new')({
  component: () => <NewAccreditation />
})
