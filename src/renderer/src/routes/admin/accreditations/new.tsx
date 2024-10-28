import { Box, Paper } from '@mui/material'
import AccreditationForm from '@renderer/components/admin/formulaires/AccreditationForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de la route
 * @returns JSX Composant
 */
const NewAccreditation = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <SousTitre sx={{ mb: 2 }} titre="Nouvelle Accréditation" />
        <AccreditationForm accreditation={null} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/accreditations/new')({
  component: () => <NewAccreditation />
})
