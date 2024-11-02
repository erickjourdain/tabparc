import { Card, CardActions, CardContent, CardHeader, Chip, IconButton, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CloseIcon from '@mui/icons-material/Close'
import EmailIcon from '@mui/icons-material/Email'
import { Demande, FindAndCount, Statut } from '@renderer/type'
import loadData from '@renderer/utils/loader/admin'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { z } from 'zod'
import { useCallback } from 'react'

// Schema des paramètres de la recherche
const formSearchSchema = z.object({
  page: z.optional(z.number()),
  search: z.optional(z.string())
})

// Définition du Type des éléments de recherche
type FormSearchSchema = z.infer<typeof formSearchSchema>

const DemandeIndex = () => {
  const demandes: FindAndCount<Demande> = useLoaderData({ from: '/demande/' })
  
  const handleClick = useCallback((refOpp: string) => {
    window.electron.ipcRenderer.invoke('demande.openEmail', refOpp)
  }, [])

  return (
    <Grid container spacing={2} mb={3}>
      {demandes.data.map(demande => (
        <Grid size={4} key={demande.id}>
          <Card >
            <CardContent>
              <Typography gutterBottom sx={{ fontSize: 14 }} color='primary'>
                {demande.opportunite.client}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5, fontSize: 12 }}>
                {demande.createdAt.toLocaleDateString()}
              </Typography>
              <Chip label={Object.keys(Statut)[Object.values(Statut).indexOf(demande.statut)]} />
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="voir demande">
                <VisibilityIcon />
              </IconButton>
              {(demande.statut === Statut.BROUILLON) && (
                <IconButton aria-label="envoyer demande" onClick={() => handleClick(demande.opportunite.reference) }>
                  <EmailIcon />
                </IconButton>
              )}
              <IconButton aria-label="fermer demande">
                <CloseIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

/**
 * Création de la route
 */
export const Route = createFileRoute('/demande/')({
  // Validation des paramètres de recherhce
  validateSearch: (search: Record<string, unknown>): FormSearchSchema =>
    formSearchSchema.parse(search),
  // Définition des paramètres de recherche
  loaderDeps: ({ search }) => ({
    page: search.page || 1,
    search: search.search || ''
  }),
  loader: async ({ deps }) => {
    return await loadData({ page: deps.page, search: deps.search, route:'demande' })
  }, 
  component: () => <DemandeIndex />,
})
