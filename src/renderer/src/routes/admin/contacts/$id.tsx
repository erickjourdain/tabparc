import { Alert, Box, Paper } from '@mui/material'
import { Contact } from '@apptypes/index'
import ContactForm from '@renderer/components/admin/formulaires/ContactForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import { createFileRoute } from '@tanstack/react-router'
import ErrorComponent from '@renderer/components/ErrorComponent'
import ipcRendererService from '@renderer/utils/ipcRendererService'

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
        <SousTitre sx={{ mb: 2 }} titre={`Contact ${contact.prenom} ${contact.nom}`} />
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
    const user = await ipcRendererService.invoke('contact.find', params.id)
    return user
  },
  // Affichage du composant d'erreur de chargement
  errorComponent: ({ error }) => {
    return <ErrorComponent message={error.message} component="admin/contacts/$id" />
  },
  component: () => <ShowContact />
})
