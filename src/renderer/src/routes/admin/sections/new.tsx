import { Box, Paper } from '@mui/material'
import SectionForm from '@renderer/components/admin/formulaires/SectionForm'
import SousTitre from '@renderer/components/admin/SousTitre'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de la route
 * @returns JSX Composant
 */
const NewSite = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <SousTitre sx={{ mb: 2 }} titre="Nouvelle Section" />
        <SectionForm section={null} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/sections/new')({
  component: () => <NewSite />
})
