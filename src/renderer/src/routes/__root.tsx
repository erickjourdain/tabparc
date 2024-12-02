import { User } from '@apptypes/index'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, CssBaseline, Fab, useTheme } from '@mui/material'
import DrawerHeader from '@renderer/components/DrawerHeader'
import DrawerMenu from '@renderer/components/DrawerMenu'
import MainMenu from '@renderer/components/MainMenu'
import { drawerAtom, userAtom } from '@renderer/store'
import settings from '@renderer/utils/settings'
import { createRootRoute, Outlet, useRouter } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

const Root = () => {
  // Récupération de l'utilisateur charger par le loader de la route
  const data = Route.useLoaderData()
  // Hook router
  const router = useRouter()
  // Hook theme
  const theme = useTheme()
  // Etat de gestion du statut du drawer
  const [open, setOpen] = useAtom(drawerAtom)
  // Utilisateur connecté
  const [user, setUser] = useAtom(userAtom)

  // Mise à jour de l'utilisateur
  useEffect(() => {
    setUser(data)
  }, [data])

  // Ouverture du drawer
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  // Fermeture du drawer
  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MainMenu onDrawerOpen={handleDrawerOpen} drawerStatus={open} />
      {user && <DrawerMenu onDrawerClose={handleDrawerClose} drawerStatus={open} />}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: !open
            ? `calc(100% - ${theme.spacing(8)} + 1px)`
            : `calc(100% - ${settings.drawerWith}px)`,
          height: '100%'
        }}
      >
        <DrawerHeader />
        <Outlet />
        <Fab
          color="secondary"
          aria-label="back"
          size="small"
          sx={{ position: 'fixed', bottom: 10, right: 10 }}
          onClick={() => router.history.back()}
        >
          <ArrowBackIcon />
        </Fab>
      </Box>
    </Box>
  )
}

export const Route = createRootRoute({
  loader: async (): Promise<User | null> => {
    const user = await window.electron.ipcRenderer.invoke('user.logged')
    return user
  },
  component: Root
})
