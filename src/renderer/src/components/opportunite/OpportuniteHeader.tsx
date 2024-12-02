import { Opportunite, OpportuniteCRM } from '@apptypes/index'
import { Box, Chip, Grid2 as Grid, Typography } from '@mui/material'
import { getStatut } from '@renderer/utils/format'
import ipcRendererService from '@renderer/utils/ipcRendererService'

interface OpportuniteHeaderProps {
  opportunite: Opportunite
  opportuniteCRM: OpportuniteCRM | null
}

const OpportuniteHeader = ({ opportunite, opportuniteCRM }: OpportuniteHeaderProps) => {
  // Ouverture du répertoire de l'opportunité
  const openOpportuniteCRM = () => {
    ipcRendererService.invoke('directory.openOpportuniteCRM', opportuniteCRM?.reference)
  }

  return (
    <Box>
      <Grid container>
        <Grid size={6}>
          <Chip
            label={opportunite.refOpportunite}
            color="primary"
            sx={{ cursor: 'pointer', mr: 2 }}
            onDoubleClick={openOpportuniteCRM}
          />
          <Chip label={opportunite.client} color="primary" />
        </Grid>
        <Grid size={6} sx={{ textAlign: 'right' }}>
          <Chip label={getStatut(opportunite.statut)} />
        </Grid>
      </Grid>
      <Typography variant="caption">
        {`Créée le ${opportunite.createdAt?.toLocaleDateString()} par ${opportunite.createur.nom} ${opportunite.createur.prenom}`}
      </Typography>
      <br />
      <Typography variant="caption">
        {`Modifiée le ${opportunite.updatedAt?.toLocaleDateString()} par ${opportunite.gestionnaire.nom} ${opportunite.gestionnaire.prenom}`}
      </Typography>
    </Box>
  )
}

export default OpportuniteHeader
