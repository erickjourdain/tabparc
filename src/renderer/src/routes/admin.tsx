import Admin from '@renderer/components/Admin'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: () => <Admin />
})
