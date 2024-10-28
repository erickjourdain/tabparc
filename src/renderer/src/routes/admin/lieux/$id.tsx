import { Alert, Box, Paper } from '@mui/material'
import LieuForm from '@renderer/components/admin/formulaires/LieuForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import { Lieu } from '@renderer/type'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de visualisation
 * @returns JSX Composant
 */
const ShowLieu = () => {
  // Récupération du lieu chargé par le loader de la route
  const lieu = Route.useLoaderData()

  // Utilisateur non trouvé
  if (!lieu) return <Alert severity="warning">Lieu inconnu</Alert>

  return (
    <Paper>
      <Box px={3} py={2}>
        <SousTitre sx={{ mb: 2 }} titre={lieu.site} />
        <LieuForm lieu={lieu} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/lieux/$id')({
  loader: async ({ params }): Promise<Lieu | null> => {
    if (Number.isNaN(parseInt(params.id))) return null
    const user = await window.electron.ipcRenderer.invoke('lieu.find', params.id)
    return user
  },
  component: () => <ShowLieu />
})
