import { Chip, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Opportunite } from '@renderer/type'

interface DemandeFormProps {
    opportunite: Opportunite
}

const DemandeForm = ( { opportunite }: DemandeFormProps) => {

    return (
        <>
        <Grid size={12}>
        <Chip
          label={opportunite.statut}
        />
      </Grid>
      <Grid size={4}>
        <TextField
          fullWidth
          value={opportunite.client}
          label="client"
          size="small"
          disabled
        />
      </Grid>
      <Grid size={4}>
        <TextField
          fullWidth
          value={`${opportunite.contactNom} ${opportunite.contactPrenom}`}
          label="contact"
          size="small"
          disabled
        />
      </Grid>
      <Grid size={4}>
        <TextField
          fullWidth
          value={opportunite.dateCreation.toLocaleDateString()}
          label="date création"
          size="small"
          disabled
        />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          value={opportunite.titre}
          label="titre"
          size="small"
          disabled
        />
      </Grid>
      </>
    )
}

export default DemandeForm
