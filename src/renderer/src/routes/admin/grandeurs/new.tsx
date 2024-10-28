import { Box, Paper } from '@mui/material'
import GrandeurForm from '@renderer/components/admin/formulaires/GrandeurForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de la route
 * @returns JSX Composant
 */
const NewGrandeur = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <SousTitre sx={{ mb: 2 }} titre="Nouvelle grandeur" />
        <GrandeurForm grandeur={null} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/grandeurs/new')({
  component: () => <NewGrandeur />
})
