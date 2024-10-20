import { Alert, Box, Paper, Typography } from '@mui/material'
import { Route } from '@renderer/routes/admin/contacts/$id'
import ContactForm from './ContactForm'

const ShowContact = () => {
  // Récupération du contact chargé par le loader de la route
  const contact = Route.useLoaderData()

  // Utilisateur non trouvé
  if (!contact) return <Alert severity="warning">Contact inconnu</Alert>

  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          Contact {contact.prenom} {contact.nom}
        </Typography>
        <ContactForm contact={contact} />
      </Box>
    </Paper>
  )
}

export default ShowContact
