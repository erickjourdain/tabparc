import { Box, Paper, Typography } from '@mui/material'
import AccreditationForm from './AccreditationForm'

const NewAccreditation = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          Nouvelle Accréditation
        </Typography>
        <AccreditationForm accreditation={null} />
      </Box>
    </Paper>
  )
}

export default NewAccreditation
