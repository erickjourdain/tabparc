import { Alert, Box, Button, Paper } from '@mui/material'
import Titre from '@renderer/components/Titre'
import Grid from '@mui/material/Grid2'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputForm from '@renderer/components/form/InputForm'
import OpportuniteForm from '@renderer/components/opportunite/OpportuniteForm'
import { Opportunite, OpportuniteCRM } from '@apptypes/index'
import ipcRendererService from '@renderer/utils/ipcRendererService'
import { useSetAtom } from 'jotai'
import { alertAtom } from '@renderer/store'

type IOppForm = {
  opportunite: string
}

const OpportuniteNouvelle = () => {
  // Hook de navigation
  const navigate = useNavigate()
  // Etat local de gestion de la sauvegarde
  const [isPending, setIsPending] = useState<boolean>(false)
  const [opportuniteCRM, setOpportuniteCRM] = useState<OpportuniteCRM | null | undefined>(undefined)
  const [creationOpportunite, setCreationOpportunite] = useState<boolean>(false)
  const [opportunite, setOpportunite] = useState<Opportunite | null>(null)
  const setAlerte = useSetAtom(alertAtom)

  // Hook de gestion du formulaire de recherche de l'opportunité
  const { control, handleSubmit, reset } = useForm<IOppForm>({
    defaultValues: {
      opportunite: 'OPP2415002'
    }
  })

  // Soumission du formulaire de recherche de l'opportunité
  const onSubmit = async (data: IOppForm) => {
    try {
      // reset des états locaux du composant
      setOpportuniteCRM(undefined)
      setCreationOpportunite(false)
      // lancement de la requête de recherche de l'opportunité CRM
      setIsPending(true)
      const opportuniteCRM: OpportuniteCRM | null = await ipcRendererService.invoke(
        'opportunite.searchCRM',
        data.opportunite.trim()
      )
      // recherche demande existante dans la base de données
      const { opportunite }: { opportunite: Opportunite | null } = await ipcRendererService.invoke(
        'opportunite.findOpp',
        opportuniteCRM?.reference,
        false
      )
      setOpportunite(opportunite)
      // mise à jour des états locaux du composant
      setOpportuniteCRM(opportuniteCRM)
      if (opportuniteCRM && opportuniteCRM.statut.indexOf('Close') === -1 && opportunite === null)
        setCreationOpportunite(true)
      setIsPending(false)
    } catch (error) {
      const err = error as Error
      setAlerte({ message: err.message, color: 'error' })
    }
  }

  // Remise à zéro du formulaire de recherche
  const onReset = () => {
    setOpportuniteCRM(undefined)
    setCreationOpportunite(false)
    reset()
  }

  // Génération d'une nouvelle opportunité
  const onNewOpp = async () => {
    // création de l'opportunité
    ipcRendererService
      .invoke('opportunite.new', opportuniteCRM?.reference)
      .then((opportunite: Opportunite) => {
        setAlerte({ message: 'Opportunité enregistrée', color: 'success' })
        navigate({ to: `/opportunites/${opportunite.id}` })
      })
      .catch((error) => {
        setAlerte({ message: error.error.message, color: 'error' })
      })
  }

  return (
    <>
      <Titre titre="Nouvelle Opportunité" />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ position: 'relative' }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} mb={3} alignItems="flex-start">
            <Grid size={{ xs: 12, sm: 4, md: 2 }}>
              <InputForm
                control={control}
                name="opportunite"
                rules={{
                  required: "La référence de l'opportunité obligatoire",
                  pattern: {
                    value: /^OPP\d{7}$/,
                    message: 'La référence est invalide'
                  }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isPending}
                sx={{ mr: 2 }}
              >
                Recherher
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => onReset()}
                disabled={isPending}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {opportuniteCRM === null && (
        <Alert color="warning">L&apos;opportunité n&apos;existe pas</Alert>
      )}
      {opportuniteCRM && !creationOpportunite && opportunite !== null && (
        <Alert
          color="warning"
          sx={{ mb: 2 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => navigate({ to: `/opportunites/${opportunite.id}` })}
            >
              VOIR
            </Button>
          }
        >
          Il existe déjà une demande pour cette opportunité
        </Alert>
      )}
      {opportuniteCRM && !creationOpportunite && opportunite === null && (
        <Alert color="warning" sx={{ mb: 2 }}>
          L&apos;opportunité est close
        </Alert>
      )}
      {opportuniteCRM && (
        <Paper>
          <Box sx={{ flexGrow: 1 }} px={3} py={2}>
            <Grid container spacing={2} mb={3}>
              <OpportuniteForm opportuniteCRM={opportuniteCRM} />
              {creationOpportunite && (
                <Grid size={6} display="flex" justifyContent="center" alignItems="center">
                  <Button color="primary" variant="outlined" onClick={() => onNewOpp()}>
                    Créer une nouvelle opportunité
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </Paper>
      )}
    </>
  )
}

export const Route = createFileRoute('/opportunites/nouvelle')({
  component: () => <OpportuniteNouvelle />
})
