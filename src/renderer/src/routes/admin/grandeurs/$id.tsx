import { Grandeur } from '@apptypes/index'
import { Alert, Box, Paper } from '@mui/material'
import GrandeurForm from '@renderer/components/admin/formulaires/GrandeurForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import ErrorComponent from '@renderer/components/ErrorComponent'
import ipcRendererService from '@renderer/utils/ipcRendererService'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de visualisation
 * @returns JSX Composant
 */
const ShowGrandeur = () => {
  // Récupération du contact chargé par le loader de la route
  const grandeur = Route.useLoaderData()

  // Utilisateur non trouvé
  if (!grandeur) return <Alert severity="warning">Grandeur inconnue</Alert>

  return (
    <Paper>
      <Box px={3} py={2}>
        <SousTitre sx={{ mb: 2 }} titre={grandeur.nom || ''} />
        <GrandeurForm grandeur={grandeur} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/grandeurs/$id')({
  loader: async ({ params }): Promise<Grandeur | null> => {
    if (Number.isNaN(parseInt(params.id))) return null
    const user = await ipcRendererService.invoke('grandeur.find', params.id, [
      'accreditation',
      'contacts',
      'section',
      'site',
      'instruments'
    ])
    return user
  },
  // Affichage du composant d'erreur de chargement
  errorComponent: ({ error }) => {
    return <ErrorComponent message={error.message} component="admin/grandeurs/$id" />
  },
  component: () => <ShowGrandeur />
})
