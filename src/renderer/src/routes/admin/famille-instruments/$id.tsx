import { FamilleInstrument } from '@apptypes/index'
import { Alert, Box, Paper } from '@mui/material'
import InstrumentForm from '@renderer/components/admin/formulaires/FamilleInstrumentForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de visualisation
 * @returns JSX Composant
 */
const ShowInstrument = () => {
  // Récupération de l'instrument chargé par le loader de la route
  const familleInstrument = Route.useLoaderData()

  // Instrument non trouvé
  if (!familleInstrument)
    return <Alert severity="warning">Famille d&apos;instruments inconnue</Alert>

  return (
    <Paper>
      <Box px={3} py={2}>
        <SousTitre sx={{ mb: 2 }} titre={familleInstrument.nom} />
        <InstrumentForm familleInstrument={familleInstrument} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/famille-instruments/$id')({
  loader: async ({ params }): Promise<FamilleInstrument | null> => {
    if (Number.isNaN(parseInt(params.id))) return null
    const user = await window.electron.ipcRenderer.invoke('famille-instrument.find', params.id)
    return user
  },
  component: () => <ShowInstrument />
})
