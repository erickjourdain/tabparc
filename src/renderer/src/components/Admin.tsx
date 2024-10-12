import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import Users from '@renderer/components/admin/Users'
import { useState } from 'react'

interface Type {
  label: string
  element: JSX.Element
}

const DONNEES = [
  { label: 'utilisateurs', element: <Users /> },
  { label: 'sections', element: <>sections</> }
]

const Admin = () => {
  const [element, setElement] = useState<Type>(DONNEES[0])

  const handleChange = (event: SelectChangeEvent) => {
    const selected = DONNEES.findIndex((d) => d.label === event.target.value)
    if (selected >= 0) setElement(DONNEES[selected])
  }

  return (
    <Box>
      <Alert icon={false} severity="success" sx={{ mb: 1 }}>
        Administration des données
      </Alert>
      <FormControl sx={{ width: '50%' }}>
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
      {element.element}
    </Box>
  )
}

export default Admin
