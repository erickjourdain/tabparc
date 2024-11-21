import { Alert, Box, Button, Paper } from '@mui/material'
import Titre from '@renderer/components/Titre'
import Grid from '@mui/material/Grid2'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputForm from '@renderer/components/form/InputForm'
import DemandeForm from '@renderer/components/demande/DemandeForm'
import { Demande, Opportunite } from '@apptypes/index'
import ipcRendererService from '@renderer/utils/ipcRendererService'
import { useSetAtom } from 'jotai'
import { alertAtom } from '@renderer/store'

type IOppForm = {
  opportunite: string
}

const DemandeNouvelle = () => {
  // Hook de navigation
  const navigate = useNavigate()
  // Etat local de gestion de la sauvegarde
  const [isPending, setIsPending] = useState<boolean>(false)
  const [opportunite, setOpportunite] = useState<Opportunite | null | undefined>(undefined)
  const [creationDemande, setCreationDemande] = useState<boolean>(false)
  const [demande, setDemande] = useState<Demande | null>(null)
  const setAlerte = useSetAtom(alertAtom)

  // Hook de gestion du formulaire de recherche de l'opportunité
  const { control, handleSubmit, reset } = useForm<IOppForm>({
    defaultValues: {
      opportunite: 'OPP2415002'
    }
  })

  // Soumission du formulaire de recherche de l'opportunité
  const onSubmit = async (data: IOppForm) => {
    // reset des états locaux du composant
    setOpportunite(undefined)
    setCreationDemande(false)
    // lancement de la requête de recherche de l'opportunité
    setIsPending(true)
    const opportunite: Opportunite | null = await window.electron.ipcRenderer.invoke(
      'opportunite.search',
      data.opportunite.trim()
    )
    // recherche demande existante dans la base de données
    const { demande }: { demande: Demande | null } = await window.electron.ipcRenderer.invoke(
      'demande.findOpp',
      opportunite?.reference,
      false
    )
    setDemande(demande)
    // mise à jour des états locaux du composant
    setOpportunite(opportunite)
    if (opportunite && opportunite.statut.indexOf('Close') === -1 && demande === null)
      setCreationDemande(true)
    setIsPending(false)
  }

  // Remise à zéro du formulaire de recherche
  const onReset = () => {
    setOpportunite(undefined)
    setCreationDemande(false)
    reset()
  }

  // Génération d'une nouvelle demande
  const onNewDemande = async () => {
    // création de la demande
    ipcRendererService
      .invoke('demande.new', opportunite?.reference)
      .then((demande: Demande) => {
        setAlerte({ message: 'Demande enregistrée', color: 'success' })
        navigate({ to: `/demande/${demande.id}` })
      })
      .catch((error) => {
        setAlerte({ message: error.error.message, color: 'error' })
      })
  }

  return (
    <>
      <Titre titre="Nouvelle Demande" />
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
      {opportunite === null && <Alert color="warning">L&apos;opportunité n&apos;existe pas</Alert>}
      {opportunite && !creationDemande && demande !== null && (
        <Alert
          color="warning"
          sx={{ mb: 2 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => navigate({ to: `/demande/${demande.id}` })}
            >
              VOIR
            </Button>
          }
        >
          Il existe déjà une demande pour cette opportunité
        </Alert>
      )}
      {opportunite && !creationDemande && demande === null && (
        <Alert color="warning" sx={{ mb: 2 }}>
          L&apos;opportunité est close
        </Alert>
      )}
      {opportunite && (
        <Paper>
          <Box sx={{ flexGrow: 1 }} px={3} py={2}>
            <Grid container spacing={2} mb={3}>
              <DemandeForm opportunite={opportunite} />
              {creationDemande && (
                <Grid size={6} display="flex" justifyContent="center" alignItems="center">
                  <Button color="primary" variant="outlined" onClick={() => onNewDemande()}>
                    Créer une nouvelle demande
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

export const Route = createFileRoute('/demande/nouvelle')({
  component: () => <DemandeNouvelle />
})
