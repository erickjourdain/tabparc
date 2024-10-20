import { Alert, Box, Paper, Typography } from '@mui/material'
import { Route } from '@renderer/routes/admin/lieux/$id'
import LieuForm from './LieuForm'

const ShowLieu = () => {
  // Récupération du lieu chargé par le loader de la route
  const lieu = Route.useLoaderData()

  // Utilisateur non trouvé
  if (!lieu) return <Alert severity="warning">Lieu inconnu</Alert>

  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          {lieu.site}
        </Typography>
        <LieuForm lieu={lieu} />
      </Box>
    </Paper>
  )
}

export default ShowLieu
