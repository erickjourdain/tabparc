import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { Outlet, useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'

interface Type {
  label: string
  route: string
}

const DONNEES = [
  { label: 'utilisateurs', route: '/admin/users' },
  { label: 'contacts', route: '/admin/contacts' },
  { label: 'accreditations', route: '/admin/accreditations' },
  { label: 'famille instruments', route: '/admin/famille-instruments' },
  { label: 'grandeurs', route: '/admin/grandeurs' },
  { label: 'sites', route: '/admin/sites' },
  { label: 'sections', route: '/admin/sections' }
]

const Admin = () => {
  // Hook de navigation
  const navigate = useNavigate()
  // Etat local représentant la liste des élements de configuration
  const [element, setElement] = useState<Type>(DONNEES[0])

  // Changement de la sélection
  const handleChange = useCallback((event: SelectChangeEvent) => {
    const selected = DONNEES.findIndex((d) => d.label === event.target.value)
    if (selected >= 0) {
      setElement(DONNEES[selected])
      navigate({ to: DONNEES[selected].route })
    }
  }, [])

  useEffect(() => {
    navigate({ to: element.route })
  }, [])

  return (
    <Box>
      <Alert icon={false} severity="success" sx={{ mb: 1 }}>
        Administration des données
      </Alert>
      <FormControl sx={{ width: '50%', mb: 2 }}>
        <InputLabel id="admin-type-select-label">Type</InputLabel>
        <Select
          labelId="admin-type-select-label"
          id="admin-type-select"
          value={element.label}
          label="Age"
          onChange={handleChange}
        >
          {DONNEES.map((type) => (
            <MenuItem key={type.label} value={type.label}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Outlet />
    </Box>
  )
}

export default Admin
