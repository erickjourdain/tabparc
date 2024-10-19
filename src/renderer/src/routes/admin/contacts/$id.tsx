import ShowContact from '@renderer/components/admin/contacts/ShowContact'
import { Contact } from '@renderer/type'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/contacts/$id')({
  loader: async ({ params }): Promise<Contact | null> => {
    if (Number.isNaN(parseInt(params.id))) return null
    const user = await window.electronAPI.getContact(parseInt(params.id))
    return user
  },
  component: () => <ShowContact />
})
