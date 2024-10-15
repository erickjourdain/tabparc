import { Box, Paper, Typography } from '@mui/material'
import UserForm from './UserForm'

const NewUser = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }}>
          Nouvel utilisateur
        </Typography>
        <UserForm user={null} />
      </Box>
    </Paper>
  )
}

export default NewUser
