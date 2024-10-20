import NewInstrument from '@renderer/components/admin/instruments/NewInstrument'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/instruments/new')({
  component: () => <NewInstrument />
})
