import { Box, Paper, Typography } from '@mui/material'
import InstrumentForm from '@renderer/components/admin/formulaires/InstrumentForm'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de la route
 * @returns JSX Composant
 */
const NewInstrument = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          Nouvel Instrument
        </Typography>
        <InstrumentForm instrument={null} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/instruments/new')({
  component: () => <NewInstrument />
})
