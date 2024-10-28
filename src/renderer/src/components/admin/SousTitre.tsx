import { SxProps, Theme, Typography } from '@mui/material'

interface SousTitreProps {
  titre: string
  sx?: SxProps<Theme> | undefined
}

const SousTitre = ({ titre, sx }: SousTitreProps) => {
  return (
    <Typography variant="h6" sx={sx} color="primary">
      {titre}
    </Typography>
  )
}

export default SousTitre
