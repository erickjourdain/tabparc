import ShowInstrument from '@renderer/components/admin/instruments/ShowInstrument'
import { Instrument } from '@renderer/type'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/instruments/$id')({
  loader: async ({ params }): Promise<Instrument | null> => {
    if (Number.isNaN(parseInt(params.id))) return null
    const user = await window.electronAPI.getInstrument(parseInt(params.id))
    return user
  },
  component: () => <ShowInstrument />
})
