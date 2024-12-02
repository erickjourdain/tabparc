import {
  Card,
  CardActions,
  CardContent,
  Chip,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EmailIcon from '@mui/icons-material/Email'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { FindAndCount } from '@renderer/type'
import loadData from '@renderer/utils/loader/admin'
import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useCallback, useRef, useState } from 'react'
import { getStatut } from '@renderer/utils/format'
import { Opportunite, Statut } from '@apptypes/index'
import ErrorComponent from '@renderer/components/ErrorComponent'
import ipcRendererService from '@renderer/utils/ipcRendererService'

// Schema des paramètres de la recherche
const formSearchSchema = z.object({
  page: z.optional(z.number()),
  search: z.optional(z.string())
})

// Définition du Type des éléments de recherche
type FormSearchSchema = z.infer<typeof formSearchSchema>

const OpportuniteIndex = () => {
  const opportunites: FindAndCount<Opportunite> = useLoaderData({ from: '/opportunites/' })
  // Reférence pour l'ouverture du menu déroulant
  const anchorRef = useRef<HTMLDivElement>(null)
  // Hook navigation
  const navigate = useNavigate()
  // Etat gérant l'ouverture du menu déroulant
  const [open, setOpen] = useState(false)
  // Ouverture du message pour envoi au client
  const handleClick = useCallback((refOpp: string) => {
    ipcRendererService.invoke('opportunite.openEmail', refOpp)
  }, [])
  // Mise à jour du statut de la demande
  const handleMenuItemClick = useCallback((opportunite: Opportunite, option: string) => {
    if (opportunite.statut === Statut[option]) return
    ipcRendererService
      .invoke('opportunite.update', {
        ...opportunite,
        statut: Statut[option]
      })
      .then(() => {
        opportunite.statut = Statut[option]
        setOpen(false)
      })
  }, [])
  // Changement état du menu déroulant
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }
    setOpen(false)
  }

  return (
    <Grid container spacing={2} mb={3}>
      {opportunites.data.map((opportunite) => (
        <Grid size={{ sm: 6, md: 3, lg: 2 }} key={opportunite.id}>
          <Card>
            <CardContent>
              <Typography gutterBottom sx={{ fontSize: 14 }} color="primary">
                {opportunite.client}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5, fontSize: 12 }}>
                {opportunite.createdAt?.toLocaleDateString()}
              </Typography>
              <Chip label={getStatut(opportunite.statut)} />
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
              <IconButton
                aria-label="voir opportunite"
                onClick={() => navigate({ to: `/opportunites/${opportunite.id}` })}
              >
                <VisibilityIcon />
              </IconButton>
              {opportunite.statut === Statut.BROUILLON && (
                <IconButton
                  aria-label="envoyer demande"
                  onClick={() => handleClick(opportunite.refOpportunite)}
                >
                  <EmailIcon />
                </IconButton>
              )}
              <div ref={anchorRef}>
                <IconButton aria-label="change statut" onClick={handleToggle}>
                  <MoreVertIcon />
                </IconButton>
              </div>
              <Popper
                sx={{ zIndex: 1 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem>
                          {Object.keys(Statut).map((option) => (
                            <MenuItem
                              key={option}
                              onClick={() => handleMenuItemClick(opportunite, option)}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
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
export const Route = createFileRoute('/opportunites/')({
  // Validation des paramètres de recherhce
  validateSearch: (search: Record<string, unknown>): FormSearchSchema =>
    formSearchSchema.parse(search),
  // Définition des paramètres de recherche
  loaderDeps: ({ search }) => ({
    page: search.page || 1,
    search: search.search || ''
  }),
  loader: async ({ deps }) => {
    return await loadData({ page: deps.page, search: deps.search, route: 'opportunite' })
  },
  // Affichage du composant d'erreur de chargement
  errorComponent: ({ error }) => {
    return <ErrorComponent error={error} message="Impossible de charger l'index des opportunités" />
  },
  component: () => <OpportuniteIndex />
})
