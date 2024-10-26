import { Box, Paper, Typography } from '@mui/material'
import ContactForm from '@renderer/components/admin/formulaires/ContactForm'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de la route
 * @returns JSX Composant
 */
const NewContact = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          Nouveau contact
        </Typography>
        <ContactForm contact={null} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/contacts/new')({
  component: () => <NewContact />
})
