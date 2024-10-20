import ShowLieu from '@renderer/components/admin/lieux/ShowLieu'
import { Lieu } from '@renderer/type'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/lieux/$id')({
  loader: async ({ params }): Promise<Lieu | null> => {
    if (Number.isNaN(parseInt(params.id))) return null
    const user = await window.electronAPI.getLieu(parseInt(params.id))
    return user
  },
  component: () => <ShowLieu />
})
