import AddIcon from '@mui/icons-material/Add'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Fab,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import settings from '@renderer/utils/settings'
import { useLoaderData, useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const ListContacts = () => {
  // Hook de navigation
  const navigate = useNavigate({ from: '/admin/contacts' })
  // Hook du loader de la route
  const loader = useLoaderData({ from: '/admin/contacts/' })
  // Hook des paramètres de recherche de la page
  const { page, search } = useSearch({ from: '/admin/contacts/' })

  // Etat local de gestion du champ de recherche
  const [newSearch, setNewSearch] = useState<string>(search || '')

  // Mise à jour du champ de recherche local lors du changement de page
  useEffect(() => setNewSearch(search || ''), [search])

  // Décalage du lancement de changement de page suite modification champ de recherche
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      navigate({
        search: {
          page: 1,
          search: newSearch.trim().length ? newSearch.trim() : undefined
        }
      })
    }, 500)
    return () => clearTimeout(timeOutId)
  }, [navigate, newSearch])

  return (
    <Paper sx={{ m: 1, p: 2, position: 'relative' }}>
      <Typography variant="h6">Gestion des contacts</Typography>
      <Fab
        color="primary"
        aria-label="ajouter-contact"
        size="small"
        sx={{ position: 'absolute', top: 10, right: 10 }}
        onClick={() => navigate({ to: '/admin/contacts/new' })}
      >
        <AddIcon />
      </Fab>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          id="input-search"
          label="Recherche"
          value={newSearch}
          onChange={(e) => setNewSearch(e.currentTarget.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={() => navigate({ search: { page: 1, search: '' } })}>
                  <ClearIcon />
                </IconButton>
              )
            }
          }}
          variant="standard"
        />
      </Box>
      <Table aria-label="table contacts">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell>Valide</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loader.data.map((contact) => (
            <TableRow
              key={contact.id}
              onDoubleClick={() => navigate({ to: `/admin/contacts/${contact.id}` })}
            >
              <TableCell>{`${contact.prenom} ${contact.nom}`}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.telephone}</TableCell>
              <TableCell>
                {contact.valide ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={loader.nbData}
        rowsPerPage={settings.nbElements}
        page={page !== undefined ? page - 1 : 0}
        onPageChange={(_evt, newPage) =>
          navigate({ search: (prev) => ({ ...prev, page: newPage + 1 }) })
        }
      />
    </Paper>
  )
}

export default ListContacts