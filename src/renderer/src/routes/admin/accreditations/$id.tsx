import ShowAccreditation from '@renderer/components/admin/accreditations/ShowAccreditation'
import { Accreditation } from '@renderer/type'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/accreditations/$id')({
  loader: async ({ params }): Promise<Accreditation | null> => {
    if (Number.isNaN(parseInt(params.id))) return null
    const user = await window.electronAPI.getAccreditation(parseInt(params.id))
    return user
  },
  component: () => <ShowAccreditation />
})
