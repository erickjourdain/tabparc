import { Box, Paper, Typography } from '@mui/material'
import UserForm from '@renderer/components/admin/users/UserForm'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de la route
 * @returns JSX Composant
 */
const NewUser = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          Nouvel utilisateur
        </Typography>
        <UserForm user={null} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/users/new')({
  component: () => <NewUser />
})
