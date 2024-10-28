import { Box, Paper } from '@mui/material'
import ContactForm from '@renderer/components/admin/formulaires/ContactForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de la route
 * @returns JSX Composant
 */
const NewContact = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <SousTitre sx={{ mb: 2 }} titre="Nouveau contact" />
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
