import { Box, Paper } from '@mui/material'
import LieuForm from '@renderer/components/admin/formulaires/LieuForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de la route
 * @returns JSX Composant
 */
const NewLieu = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <SousTitre sx={{ mb: 2 }} titre="Nouveau Lieu" />
        <LieuForm lieu={null} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/lieux/new')({
  component: () => <NewLieu />
})
