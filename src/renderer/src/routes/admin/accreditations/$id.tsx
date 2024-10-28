import { Alert, Box, Paper } from '@mui/material'
import AccreditationForm from '@renderer/components/admin/formulaires/AccreditationForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import { Accreditation } from '@renderer/type'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de visualisation
 * @returns JSX Composant
 */
const ShowAccreditation = () => {
  // Récupération de l'accrediation chargée par le loader de la route
  const accreditation = Route.useLoaderData()

  // Utilisateur non trouvé
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
    const user = await window.electron.ipcRenderer.invoke('accreditation.find', params.id)
    return user
  },
  component: () => <ShowAccreditation />
})
