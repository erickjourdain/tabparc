import { OpportuniteCRM } from '@apptypes/index'
import { Chip, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2'

interface OpportuniteFormProps {
  opportuniteCRM: OpportuniteCRM
}

const OpportuniteForm = ({ opportuniteCRM }: OpportuniteFormProps) => {
  return (
    <>
      <Grid size={12}>
        <Chip label={opportuniteCRM.statut} />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <TextField fullWidth value={opportuniteCRM.client} label="client" size="small" disabled />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          fullWidth
          value={`${opportuniteCRM.contactNom} ${opportuniteCRM.contactPrenom}`}
          label="contact"
          size="small"
          disabled
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 2 }}>
        <TextField
          fullWidth
          value={opportuniteCRM.dateCreation.toLocaleDateString()}
          label="date création"
          size="small"
          disabled
        />
      </Grid>
      <Grid size={12}>
        <TextField fullWidth value={opportuniteCRM.titre} label="titre" size="small" disabled />
      </Grid>
    </>
  )
}

export default OpportuniteForm
