import MenuIcon from '@mui/icons-material/Menu'
import {
  Avatar,
  Box,
  Container,
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Typography
} from '@mui/material'
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import { userAtom } from '@renderer/store'
import stringAvatar from '@renderer/utils/iconLetter'
import settings from '@renderer/utils/settings'
import { useAtomValue } from 'jotai'

interface MainMenuProps {
  drawerStatus: boolean
  onDrawerOpen: () => void
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: settings.drawerWith,
        width: `calc(100% - ${settings.drawerWith}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      }
    }
  ]
}))

const MainMenu = ({ drawerStatus, onDrawerOpen }: MainMenuProps) => {
  const user = useAtomValue(userAtom)

  return (
    <AppBar position="fixed" open={drawerStatus}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5
              },
              drawerStatus && { display: 'none' }
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Tabparc
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton>
            <Avatar {...stringAvatar(`${user?.prenom} ${user?.nom}`)} />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default MainMenu
