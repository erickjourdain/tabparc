import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import { Divider, IconButton, Drawer as MuiDrawer } from '@mui/material'
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles'
import { userAtom } from '@renderer/store'
import settings from '@renderer/utils/settings'
import { useAtomValue } from 'jotai'
import DrawerHeader from './DrawerHeader'
import MenuList from './MenuList'

interface DrawerMenuProps {
  drawerStatus: boolean
  onDrawerClose: () => void
}

// Liste des entrées du menu standard
const itemsMenu = [{ label: 'accueil', icon: <HomeIcon />, route: '/' }]
// Liste des entrées du meny administration
const itemsAdmin = [{ label: 'administration', icon: <SettingsIcon />, route: '/admin' }]

// style css pour l'ouverture du drawer
const openedMixin = (theme: Theme): CSSObject => ({
  width: settings.drawerWith,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

// style css pour la fermeture du drawer
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

// style du drawer
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
  width: settings.drawerWith,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
      }
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
      }
    }
  ]
}))

const DrawerMenu = ({ onDrawerClose, drawerStatus }: DrawerMenuProps) => {
  const theme = useTheme()

  // Utilisateur connecté
  const user = useAtomValue(userAtom)

  return (
    <Drawer variant="permanent" open={drawerStatus}>
      <DrawerHeader>
        <IconButton onClick={onDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <MenuList drawerStatus={drawerStatus} items={itemsMenu} />
      <Divider />
      {user?.role === 'ADMIN' && <MenuList drawerStatus={drawerStatus} items={itemsAdmin} />}
    </Drawer>
  )
}

export default DrawerMenu
