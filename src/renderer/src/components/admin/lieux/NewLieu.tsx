import { Box, Paper, Typography } from '@mui/material'
import LieuForm from './LieuForm'

const NewLieu = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          Nouveau Lieu
        </Typography>
        <LieuForm lieu={null} />
      </Box>
    </Paper>
  )
}

export default NewLieu
