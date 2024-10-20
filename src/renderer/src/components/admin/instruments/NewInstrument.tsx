import { Box, Paper, Typography } from '@mui/material'
import InstrumentForm from './InstrumentForm'

const NewInstrument = () => {
  return (
    <Paper>
      <Box px={3} py={2}>
        <Typography variant="h6" sx={{ m: 2 }} color="primary">
          Nouvel Instrument
        </Typography>
        <InstrumentForm instrument={null} />
      </Box>
    </Paper>
  )
}

export default NewInstrument
