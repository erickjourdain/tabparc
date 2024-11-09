import { Card, CardActions, CardContent, Chip, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EmailIcon from '@mui/icons-material/Email'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Demande, FindAndCount, Statut } from '@renderer/type'
import loadData from '@renderer/utils/loader/admin'
import { createFileRoute, useLoaderData, useNavigate, useRouter } from '@tanstack/react-router'
import { z } from 'zod'
import { useCallback, useRef, useState } from 'react'
import { getStatut } from '@renderer/utils/format'

// Schema des paramètres de la recherche
const formSearchSchema = z.object({
  page: z.optional(z.number()),
  search: z.optional(z.string())
})

// Définition du Type des éléments de recherche
type FormSearchSchema = z.infer<typeof formSearchSchema>

const DemandeIndex = () => {
  const demandes: FindAndCount<Demande> = useLoaderData({ from: '/demande/' })
  // Reférence pour l'ouverture du menu déroulant
  const anchorRef = useRef<HTMLDivElement>(null)
  // Hook navigation
  const navigate = useNavigate()
  // Etat gérant l'ouverture du menu déroulant
  const [open, setOpen] = useState(false)
  // Ouverture du message pour envoi au client
  const handleClick = useCallback((refOpp: string) => {
    window.electron.ipcRenderer.invoke('demande.openEmail', refOpp)
  }, [])
  // Mise à jour deu statut de la demande
  const handleMenuItemClick = useCallback((demande: Demande, option: string) => {
    if (demande.statut === Statut[option]) return
    window.electron.ipcRenderer.invoke('demande.update', {
      ...demande,
      statut: Statut[option]
    })
      .then(() => {
        demande.statut = Statut[option]
        setOpen(false)
      })
  }, [])
  // Changement état du menu déroulant
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  }

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  }

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
              <Chip label={getStatut(demande.statut)} />
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <IconButton aria-label="voir demande" onClick={() => navigate({ to: `/demande/${demande.id}` })}>
                <VisibilityIcon />
              </IconButton>
              {(demande.statut === Statut.BROUILLON) && (
                <IconButton aria-label="envoyer demande" onClick={() => handleClick(demande.opportunite.reference) }>
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
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem>
                          {Object.keys(Statut).map((option) => (
                            <MenuItem
                              key={option}
                              onClick={() => handleMenuItemClick(demande, option)}
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
