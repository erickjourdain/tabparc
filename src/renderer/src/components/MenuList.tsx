import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'

interface MenuListProps {
  drawerStatus: boolean
  items: {
    label: string
    icon: JSX.Element
    route: string
  }[]
}

const MenuList = ({ drawerStatus, items }: MenuListProps) => {
  const navigate = useNavigate()

  return (
    <List>
      {items.map((item) => (
        <ListItem
          key={item.label}
          disablePadding
          sx={{ display: 'block' }}
          onClick={() => navigate({ to: item.route })}
        >
          <ListItemButton
            sx={[
              {
                minHeight: 48,
                px: 2.5
              },
              drawerStatus ? { justifyContent: 'initial' } : { justifyContent: 'center' }
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: 'center'
                },
                drawerStatus ? { mr: 3 } : { mr: 'auto' }
              ]}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={[drawerStatus ? { opacity: 1 } : { opacity: 0 }]}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

export default MenuList
