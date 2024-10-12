import { Box, CssBaseline, Typography } from '@mui/material'
import Admin from '@renderer/components/Admin'
import DrawerHeader from '@renderer/components/DrawerHeader'
import DrawerMenu from '@renderer/components/DrawerMenu'
import Home from '@renderer/components/Home'
import MainMenu from '@renderer/components/MainMenu'
import { routeAtom, userAtom } from '@renderer/store/index'
import { useAtomValue } from 'jotai'
import { useCallback, useState } from 'react'
import Forbidden from './components/Forbidden'

const App = () => {
  // etat de gestion du statut du drawer
  const [open, setOpen] = useState(false)
  // route sélectionnée
  const route = useAtomValue(routeAtom)
  // utilisateur connecté
  const user = useAtomValue(userAtom)

  // ouverture du drawer
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  // fermeture du drawer
  const handleDrawerClose = () => {
    setOpen(false)
  }

  // définition du composant à afficher en fonction de la route
  const setRoute = useCallback(() => {
    const rte = route.split['.'] !== undefined ? route.split['.'][0] : route
    switch (rte) {
      case 'HOME':
        return <Home />
      case 'ADMIN':
        return <Admin />
      case 'FORBIDDEN':
        return <Forbidden />
      default:
        return <Home />
    }
  }, [route])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MainMenu onDrawerOpen={handleDrawerOpen} drawerStatus={open} />
      {user && <DrawerMenu onDrawerClose={handleDrawerClose} drawerStatus={open} />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography sx={{ marginBottom: 2 }}>{setRoute()}</Typography>
      </Box>
    </Box>
  )
}

export default App
