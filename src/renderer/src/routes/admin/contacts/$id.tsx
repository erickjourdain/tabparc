import { Alert, Box, Paper, Typography } from '@mui/material'
import ContactForm from '@renderer/components/admin/contacts/ContactForm'
import { Contact } from '@renderer/type'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de visualisation
 * @returns JSX Composant
 */
const ShowContact = () => {
  // Récupération du contact chargé par le loader de la route
  const contact = Route.useLoaderData()

  // Utilisateur non trouvé
  if (!contact) return <Alert severity="warning">Contact inconnu</Alert>

  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          Contact {contact.prenom} {contact.nom}
        </Typography>
        <ContactForm contact={contact} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/contacts/$id')({
  loader: async ({ params }): Promise<Contact | null> => {
    if (Number.isNaN(parseInt(params.id))) return null
    const user = await window.electron.ipcRenderer.invoke('contact.find', params.id)
    return user
  },
  component: () => <ShowContact />
})
