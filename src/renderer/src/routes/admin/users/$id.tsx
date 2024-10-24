import { Alert, Box, Paper, Typography } from '@mui/material'
import UserForm from '@renderer/components/admin/users/UserForm'
import { User } from '@renderer/type'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de visualisation
 * @returns JSX Composant
 */
const ShowUser = () => {
  // Récupération de l'utilisateur charger par le loader de la route
  const user = Route.useLoaderData()

  // Utilisateur non trouvé
  if (!user) return <Alert severity="warning">Utilisateur inconnu</Alert>

  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          Profil {user.prenom} {user.nom}
        </Typography>
        <UserForm user={user} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/users/$id')({
  loader: async ({ params }): Promise<User | null> => {
    if (Number.isNaN(parseInt(params.id))) return null
    const user = await window.electron.ipcRenderer.invoke('user.find', params.id)
    return user
  },
  component: () => <ShowUser />
})
