import { Alert, Box, Paper } from '@mui/material'
import { Accreditation } from '@apptypes/index'
import AccreditationForm from '@renderer/components/admin/formulaires/AccreditationForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import { createFileRoute } from '@tanstack/react-router'
import ErrorComponent from '@renderer/components/ErrorComponent'
import ipcRendererService from '@renderer/utils/ipcRendererService'

/**
 * Composant de visualisation
 * @returns JSX Composant
 */
const ShowAccreditation = () => {
  // Récupération de l'accrediation chargée par le loader de la route
  const accreditation = Route.useLoaderData()

  // Accréditation non trouvée
  if (!accreditation) return <Alert severity="warning">Référence inconnue</Alert>

  return (
    <Paper>
      <Box px={3} py={2}>
        <SousTitre titre={accreditation.reference} sx={{ mb: 2 }} />
        <AccreditationForm accreditation={accreditation} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/accreditations/$id')({
  loader: async ({ params }): Promise<Accreditation | null> => {
    if (Number.isNaN(parseInt(params.id))) return null
    const user = await ipcRendererService.invoke('accreditation.find', params.id)
    return user
  },
  // Affichage du composant d'erreur de chargement
  errorComponent: ({ error }) => {
    return <ErrorComponent error={error} message="Impossible de charger l'accréditation demandée" />
  },
  component: () => <ShowAccreditation />
})
