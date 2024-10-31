import { Typography } from '@mui/material'

interface TitreProps {
  titre: string
}

const Titre = ({ titre }: TitreProps) => {
  return (
    <Typography color="primary" variant="h5" mb={2}>
      {titre}
    </Typography>
  )
}

export default Titre
