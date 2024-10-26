import { Box, Paper, Typography } from '@mui/material'
import GrandeurForm from '@renderer/components/admin/formulaires/GrandeurForm'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de la route
 * @returns JSX Composant
 */
const NewGrandeur = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          Nouvelle grandeur
        </Typography>
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
