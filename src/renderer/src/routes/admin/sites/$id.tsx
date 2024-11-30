import { Site } from '@apptypes/index'
import { Alert, Box, Paper } from '@mui/material'
import SiteForm from '@renderer/components/admin/formulaires/SiteForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import ErrorComponent from '@renderer/components/ErrorComponent'
import ipcRendererService from '@renderer/utils/ipcRendererService'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de visualisation
 * @returns JSX Composant
 */
const ShowSite = () => {
  // Récupération du site chargé par le loader de la route
  const site = Route.useLoaderData()

  // Site non trouvé
  if (!site) return <Alert severity="warning">Site inconnu</Alert>

  return (
    <Paper>
      <Box px={3} py={2}>
        <SousTitre titre={site.nom} sx={{ mb: 2 }} />
        <SiteForm site={site} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/sites/$id')({
  loader: async ({ params }): Promise<Site | null> => {
    if (Number.isNaN(parseInt(params.id))) return null
    const user = await ipcRendererService.invoke('site.find', params.id)
    return user
  },
  // Affichage du composant d'erreur de chargement
  errorComponent: ({ error }) => {
    return <ErrorComponent error={error} message="Impossible de charger le site demandé" />
  },
  component: () => <ShowSite />
})
