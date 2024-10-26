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
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

interface ListDataProps {
  type: string
  route:
  | '/admin/accreditations'
  | '/admin/users'
  | '/admin/contacts'
  | '/admin/instruments'
  | '/admin/lieux'
  | '/admin/grandeurs'
  data: {
    id: number | undefined
    [key: string]: string | number | boolean | undefined
  }[]
  nbData: number
}

const ListParamsData = ({ route, type, data, nbData }: ListDataProps) => {
  // Hook de navigation
  const navigate = useNavigate({ from: route })
  // Hook des paramètres de recherche de la page
  const { page, search } = useSearch({ from: `${route}/` })
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
      <Typography variant="h6" color="primary">
        Gestion des {type}
      </Typography>
      <Fab
        color="primary"
        aria-label={`ajouter-${type}`}
        size="small"
        sx={{ position: 'absolute', top: 10, right: 10 }}
        onClick={() => navigate({ to: `${route}/new` })}
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
      {data.length && (
        <>
          <Table aria-label="table accreditations">
            <TableHead>
              <TableRow>
                {Object.entries(data[0]).map(
                  ([key]) => key !== 'id' && <TableCell key={key}>{key}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((val) => (
                <TableRow key={val.id} onDoubleClick={() => navigate({ to: `${route}/${val.id}` })}>
                  {Object.entries(val).map(
                    ([key, value]) =>
                      key !== 'id' &&
                      (typeof value !== 'boolean' ? (
                        <TableCell key={key}>{value}</TableCell>
                      ) : (
                        <TableCell key={key}>
                          {value ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                        </TableCell>
                      ))
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[settings.nbElements]}
            component="div"
            count={nbData}
            rowsPerPage={settings.nbElements}
            page={page !== undefined ? page - 1 : 0}
            onPageChange={(_evt, newPage) =>
              navigate({ search: (prev) => ({ ...prev, page: newPage + 1 }) })
            }
          />
        </>
      )}
    </Paper>
  )
}

export default ListParamsData
