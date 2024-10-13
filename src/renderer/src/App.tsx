import { Box, CssBaseline, Typography } from '@mui/material'
import DrawerHeader from '@renderer/components/DrawerHeader'
import DrawerMenu from '@renderer/components/DrawerMenu'
import MainMenu from '@renderer/components/MainMenu'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { userAtom } from './store'

const App = () => {
  // etat de gestion du statut du drawer
  const [open, setOpen] = useState(false)
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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MainMenu onDrawerOpen={handleDrawerOpen} drawerStatus={open} />
      {user && <DrawerMenu onDrawerClose={handleDrawerClose} drawerStatus={open} />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography sx={{ marginBottom: 2 }}>Hello</Typography>
      </Box>
    </Box>
  )
}

export default App
