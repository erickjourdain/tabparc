import { Box, Paper } from '@mui/material'
import FamilleInstrumentForm from '@renderer/components/admin/formulaires/FamilleInstrumentForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de la route
 * @returns JSX Composant
 */
const NewFamilleInstrument = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <SousTitre sx={{ mb: 2 }} titre="Nouvelle Famille d'Instrument" />
        <FamilleInstrumentForm familleInstrument={null} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/famille-instruments/new')({
  component: () => <NewFamilleInstrument />
})
