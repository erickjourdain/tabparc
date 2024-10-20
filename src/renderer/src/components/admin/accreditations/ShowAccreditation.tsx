import { Alert, Box, Paper, Typography } from '@mui/material'
import { Route } from '@renderer/routes/admin/accreditations/$id'
import AccreditationForm from './AccreditationForm'

const ShowAccreditation = () => {
  // Récupération de l'accrediation chargée par le loader de la route
  const accreditation = Route.useLoaderData()

  // Utilisateur non trouvé
  if (!accreditation) return <Alert severity="warning">Référence inconnue</Alert>

  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          {accreditation.reference}
        </Typography>
        <AccreditationForm accreditation={accreditation} />
      </Box>
    </Paper>
  )
}

export default ShowAccreditation
