import { Alert, Box, Button, Chip, Link, Paper, TextField, Typography } from '@mui/material'
import Titre from '@renderer/components/Titre'
import Grid from '@mui/material/Grid2'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputForm from '@renderer/components/form/InputForm'
import { Opportunite } from '@renderer/type'

type IOppForm = {
  opportunite: string
}

const Nouveau = () => {
  // Etat local de gestion de la sauvegarde
  const [isPending, setIsPending] = useState<boolean>(false)
  const [opportunite, setOpportunite] = useState<Opportunite | null | undefined>(undefined)
  const [creationDemande, setCreationDemande] = useState<boolean>(false)

  // Hook de gestion du formulaire de recherche de l'opportunité
  const { control, handleSubmit, reset } = useForm<IOppForm>({
    defaultValues: {
      //opportunite: 'OPP2117077'
      opportunite: 'OPP2414055'
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
    // mise à jour des états locaux du composant
    setOpportunite(opportunite)
    if (opportunite && opportunite.statut.indexOf('Close') === -1) setCreationDemande(true)
    setIsPending(false)
  }

  // Remise à zéro du formulaire de recherche
  const onReset = () => {
    setOpportunite(undefined)
    setCreationDemande(false)
    reset()
  }

  // Génératiopn d'une nouvelle demande
  const onNewDemande = async () => {
    const message = await window.electron.ipcRenderer.invoke('demande.new', opportunite?.reference)
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
            <Grid size={4}>
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
            <Grid size={6}>
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
      {opportunite && (
        <Paper>
          <Box sx={{ flexGrow: 1 }} px={3} py={2}>
            <Grid container spacing={2} mb={3}>
              <Grid size={12}>
                <Chip label={opportunite.statut} color={creationDemande ? 'success' : 'error'} />
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

export const Route = createFileRoute('/nouveau/')({
  component: () => <Nouveau />
})
