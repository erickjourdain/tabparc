import { Alert, Box, Paper, Typography } from '@mui/material'
import { Route } from '@renderer/routes/admin/users/$id'
import UserForm from './UserForm'

const ShowUser = () => {
  // Récupération de l'utilisateur charger par le loader de la route
  const user = Route.useLoaderData()

  // Utilisateur non trouvé
  if (!user) return <Alert severity="warning">Utilisateur inconnu</Alert>

  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }}>
          Profil {user.prenom} {user.nom}
        </Typography>
        <UserForm user={user} />
      </Box>
    </Paper>
  )
}

export default ShowUser
