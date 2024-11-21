import { User } from '@apptypes/index'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, CssBaseline, Fab } from '@mui/material'
import DrawerHeader from '@renderer/components/DrawerHeader'
import DrawerMenu from '@renderer/components/DrawerMenu'
import MainMenu from '@renderer/components/MainMenu'
import { userAtom } from '@renderer/store'
import { createRootRoute, Outlet, useRouter } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

const Root = () => {
  // Récupération de l'utilisateur charger par le loader de la route
  const data = Route.useLoaderData()
  // Hook router
  const router = useRouter()
  // etat de gestion du statut du drawer
  const [open, setOpen] = useState(false)
  // utilisateur connecté
  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    setUser(data)
  }, [data])

  // ouverture du drawer
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  // fermeture du drawer
  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MainMenu onDrawerOpen={handleDrawerOpen} drawerStatus={open} />
      {user && <DrawerMenu onDrawerClose={handleDrawerClose} drawerStatus={open} />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
