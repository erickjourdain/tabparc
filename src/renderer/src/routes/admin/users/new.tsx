import { Box, Paper } from '@mui/material'
import UserForm from '@renderer/components/admin/formulaires/UserForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de la route
 * @returns JSX Composant
 */
const NewUser = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <SousTitre sx={{ mb: 2 }} titre="Nouvel utilisateur" />
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
