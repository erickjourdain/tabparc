import { Box, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  createFileRoute,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate
} from '@tanstack/react-router'
import { Opportunite, OpportuniteCRM } from '@apptypes/index'
import ipcRendererService from '@renderer/utils/ipcRendererService'
import ErrorComponent from '@renderer/components/ErrorComponent'
import OpportuniteHeader from '@renderer/components/opportunite/OpportuniteHeader'

const OpportuniteID = () => {
  // Hook navigation
  const navigate = useNavigate()
  // Récupération des données de la route
  const { opportunite, opportuniteCRM } = useLoaderData({ from: '/opportunites/$id' })

  const saveDemande = () => {
    /*
    const updateDemande = {
      id: loader.id,
      reFOpportuniteCRM: loader.opportuniteCRMOpportuniteCRM.reference,
      codeClient: loader.codeClient,
      cient: loader.client,
      dateRetour: data?.date,
      dateSouhaitee: data?.delaiDemande,
      statut: Statut.TRAITEMENT,
      createur: loader.createur,
      instruments: data?.instruments.map((inst) => {
        return {
          description: 
        }
      })
    }
    */
  }

  return (
    <Box sx={{ width: '100%' }}>
      <OpportuniteHeader opportunite={opportunite} opportuniteCRM={opportuniteCRM} />
      <Grid container spacing={2} mb={3} alignItems="flex-start">
        {opportunite.besoins.length === 0 && (
          <Button
            color="primary"
            onClick={() =>
              navigate({
                to: `/opportunites/${opportunite.id}/chargement/${opportuniteCRM?.reference}`
              })
            }
          >
            Charger Fichier
          </Button>
        )}
      </Grid>
      <Outlet />
    </Box>
  )
}

export const Route = createFileRoute('/opportunites/$id')({
  loader: async ({
    params
  }): Promise<{ opportunite: Opportunite; opportuniteCRM: OpportuniteCRM | null }> => {
    try {
      if (Number.isNaN(parseInt(params.id))) redirect({ to: '/opportunites' })
      const opportunite: Opportunite = await ipcRendererService.invoke(
        'opportunite.find',
        params.id,
        ['besoins', 'demande']
      )
      if (opportunite === null) redirect({ to: '/opportunites' })
      const opportuniteCRM: OpportuniteCRM = await ipcRendererService.invoke(
        'opportunite.searchCRM',
        opportunite.refOpportunite
      )
      return new Promise((resolve) => resolve({ opportunite, opportuniteCRM }))
    } catch (error) {
      return new Promise((_, reject) => reject(error))
    }
  },
  // Affichage du composant d'erreur de chargement
  errorComponent: ({ error }) => {
    return <ErrorComponent error={error} message="Impossible de charger l'opportunité demandée" />
  },
  component: () => <OpportuniteID />
})
