import { Box, CssBaseline } from '@mui/material'
import DrawerHeader from '@renderer/components/DrawerHeader'
import DrawerMenu from '@renderer/components/DrawerMenu'
import MainMenu from '@renderer/components/MainMenu'
import { userAtom } from '@renderer/store'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useAtomValue } from 'jotai'
import { useState } from 'react'

const Root = () => {
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
        <Outlet />
      </Box>
    </Box>
  )
}

export const Route = createRootRoute({
  component: Root
})
