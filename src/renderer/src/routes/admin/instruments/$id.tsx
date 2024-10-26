import { Alert, Box, Paper, Typography } from '@mui/material'
import InstrumentForm from '@renderer/components/admin/formulaires/InstrumentForm'
import { Instrument } from '@renderer/type'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de visualisation
 * @returns JSX Composant
 */
const ShowInstrument = () => {
  // Récupération de l'instrument chargé par le loader de la route
  const instrument = Route.useLoaderData()

  // Instrument non trouvé
  if (!instrument) return <Alert severity="warning">Instrument inconnu</Alert>

  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          {instrument.nom}
        </Typography>
        <InstrumentForm instrument={instrument} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/instruments/$id')({
  loader: async ({ params }): Promise<Instrument | null> => {
    if (Number.isNaN(parseInt(params.id))) return null
    const user = await window.electron.ipcRenderer.invoke('instrument.find', params.id)
    return user
  },
  component: () => <ShowInstrument />
})
