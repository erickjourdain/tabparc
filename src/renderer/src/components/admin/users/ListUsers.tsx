import AddIcon from '@mui/icons-material/Add'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import {
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'
import { Route } from '@renderer/routes/admin/users'
import { User } from '@renderer/type'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const ListUsers = () => {
  const NB_ELEMENTS = 10
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const [nbUsers, setNbUsers] = useState<number>(0)
  const [page, setPage] = useState(1)

  const data = Route.useLoaderData()

  useEffect(() => {
    console.log(data)
    setUsers(data.data)
    setNbUsers(data.nbdata)
  }, [data])

  return (
    <Paper sx={{ m: 1, p: 2, position: 'relative' }}>
      <Typography variant="h6">Gestion des utilisateurs</Typography>
      <Fab
        color="primary"
        aria-label="ajouter-utilisateur"
        size="small"
        sx={{ position: 'absolute', top: 10, right: 10 }}
        onClick={() => navigate({ to: '/admin/users/new' })}
      >
        <AddIcon />
      </Fab>
      <Table aria-label="table utilisateurs">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Login</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Valide</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              onDoubleClick={() => navigate({ to: `/admin/users/${user.id}` })}
            >
              <TableCell>{`${user.prenom} ${user.nom}`}</TableCell>
              <TableCell>{user.login}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.valide ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={nbUsers}
        rowsPerPage={NB_ELEMENTS}
        page={page - 1}
        onPageChange={(_event, newPage) => setPage(newPage)}
      />
    </Paper>
  )
}

export default ListUsers
