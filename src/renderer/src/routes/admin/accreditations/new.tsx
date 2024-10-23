import { Box, Paper, Typography } from '@mui/material'
import AccreditationForm from '@renderer/components/admin/accreditations/AccreditationForm'
import { createFileRoute } from '@tanstack/react-router'

/**
 * Composant de la route
 * @returns JSX Composant
 */
const NewAccreditation = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          Nouvelle Accréditation
        </Typography>
        <AccreditationForm accreditation={null} />
      </Box>
    </Paper>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/admin/accreditations/new')({
  component: () => <NewAccreditation />
})
