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
import { User } from '@renderer/type'
import { useEffect, useState } from 'react'
import { FindManyOptions } from 'typeorm'

/**
 * recherche des utilisateurs
 * @param filtre FindManyOptions<User>
 * @returns User[] tableau des utilisateurs
 */
const getUsers = async (filtre?: FindManyOptions<User>) => {
  const users = await window.electronAPI.getUsers(filtre)
  return users
}

/**
 * comptabilise le nombre d'utilisateurs total correspondant à la requête
 * @param filtre FindManyOptions<User>
 * @returns number nombre d'utilisateurs
 */
const countUsers = async (filtre?: FindManyOptions<User>) => {
  const nbUsers = await window.electronAPI.countUsers(filtre)
  return nbUsers
}

const Users = () => {
  const NB_ELEMENTS = 10
  const [users, setUsers] = useState<User[]>([])
  const [nbUsers, setNbUsers] = useState<number>(0)
  const [page, setPage] = useState(1)

  // Lancement de la rec
  useEffect(() => {
    getUsers({ skip: NB_ELEMENTS * (page - 1), take: NB_ELEMENTS }).then((data: User[]) => {
      setUsers(data)
    })
    countUsers().then((data: number) => setNbUsers(data))
  }, [])

  return (
    <Paper sx={{ m: 1, p: 2, position: 'relative' }}>
      <Typography variant="h6">Gestion des utilisateurs</Typography>
      <Fab
        color="primary"
        aria-label="ajouter-utilisateur"
        size="small"
        sx={{ position: 'absolute', top: 10, right: 10 }}
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
            <TableRow key={user.id}>
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

export default Users
