import { Alert, Box, Paper, Typography } from '@mui/material'
import { Route } from '@renderer/routes/admin/instruments/$id'
import InstrumentForm from './InstrumentForm'

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

export default ShowInstrument
