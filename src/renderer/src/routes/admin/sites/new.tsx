import { Box, Paper } from '@mui/material'
import SiteForm from '@renderer/components/admin/formulaires/SiteForm'
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
        <SousTitre sx={{ mb: 2 }} titre="Nouveau Site" />
        <SiteForm site={null} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/sites/new')({
  component: () => <NewSite />
})
