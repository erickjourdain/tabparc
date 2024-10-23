import { Box, Paper, Typography } from '@mui/material'
import LieuForm from '@renderer/components/admin/lieux/LieuForm'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de la route
 * @returns JSX Composant
 */
const NewLieu = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          Nouveau Lieu
        </Typography>
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
