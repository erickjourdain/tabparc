import { Box, Paper, Typography } from '@mui/material'
import ContactForm from './ContactForm'

const NewContact = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }}>
          Nouveau contact
        </Typography>
        <ContactForm contact={null} />
      </Box>
    </Paper>
  )
}

export default NewContact
