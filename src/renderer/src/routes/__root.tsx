import { Box, CssBaseline } from '@mui/material'
import DrawerHeader from '@renderer/components/DrawerHeader'
import DrawerMenu from '@renderer/components/DrawerMenu'
import MainMenu from '@renderer/components/MainMenu'
import { userAtom } from '@renderer/store'
import { User } from '@renderer/type'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

const Root = () => {
  // Récupération de l'utilisateur charger par le loader de la route
  const data = Route.useLoaderData()
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
      </Box>
    </Box>
  )
}

export const Route = createRootRoute({
  loader: async (): Promise<User | null> => {
    const user = await window.electronAPI.getLogged()
    return user
  },
  component: Root
})
