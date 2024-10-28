import { Box, Paper } from '@mui/material'
import InstrumentForm from '@renderer/components/admin/formulaires/InstrumentForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de la route
 * @returns JSX Composant
 */
const NewInstrument = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <SousTitre sx={{ mb: 2 }} titre="Nouvel Instrument" />
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
