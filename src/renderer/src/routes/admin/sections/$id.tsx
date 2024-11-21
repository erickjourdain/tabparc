import { Section } from '@apptypes/index'
import { Alert, Box, Paper } from '@mui/material'
import SectionForm from '@renderer/components/admin/formulaires/SectionForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de visualisation
 * @returns JSX Composant
 */
const ShowSection = () => {
  // Récupération de la section chargée par le loader de la route
  const section = Route.useLoaderData()

  // Section non trouvée
  if (!section) return <Alert severity="warning">Section inconnue</Alert>

  return (
    <Paper>
      <Box px={3} py={2}>
        <SousTitre titre={`Section ${section.reference}`} sx={{ mb: 2 }} />
        <SectionForm section={section} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/sections/$id')({
  loader: async ({ params }): Promise<Section | null> => {
    if (Number.isNaN(parseInt(params.id))) return null
    const user = await window.electron.ipcRenderer.invoke('section.find', params.id)
    return user
  },
  component: () => <ShowSection />
})
