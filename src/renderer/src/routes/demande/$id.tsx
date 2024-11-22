import { Box, Button, Chip, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { getStatut } from '@renderer/utils/format'
import { createFileRoute, redirect, useLoaderData } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { DataInstrument, Demande, Opportunite } from '@apptypes/index'
import InstrumentCarte from '@renderer/components/instrument/Carte'
import ipcRendererService from '@renderer/utils/ipcRendererService'
import ErrorComponent from '@renderer/components/ErrorComponent'

interface DisplayInfoProps {
  info: string
  label: string
  value: string | null | undefined
  error?: boolean
}

const DisplayInfo = ({ info, label, value, error = false }: DisplayInfoProps) => {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (error) setMessage("Incohérence avec l'opportunité")
  }, [error, label])

  return (
    <Grid size={{ xs: 12, sm: 4, md: 3, lg: 2 }}>
      <TextField
        disabled
        id={info}
        size="small"
        variant="filled"
        fullWidth
        label={label}
        defaultValue={value}
        error={error}
        helperText={message}
      />
    </Grid>
  )
}

const DemandeId = () => {
  // Récupération des données de la route
  const { demande, opportunite } = useLoaderData({ from: '/demande/$id' })

  const [data, setData] = useState<DataInstrument>()
  const [modification, setModification] = useState<boolean>(false)

  // Ouverture du répertoire de l'opportunité
  const openOpportunite = () => {
    window.electron.ipcRenderer.invoke('directory.openOpportunite', opportunite?.reference)
  }

  // Lancement chargement des instruments
  const onLoadInstrument = async () => {
    const data = await window.electron.ipcRenderer.invoke('instrument.load', opportunite?.reference)
    setData(data)
    setModification(true)
  }

  // Tester cohérence contact fichier et opportunité
  const testContact = () => {
    if (data === undefined || data.contact === null || opportunite === null) return true
    else
      return (
        data.contact.toLocaleLowerCase().indexOf(opportunite.contactNom.toLocaleLowerCase()) < 0
      )
  }

  const saveDemande = () => {
    /*
    const updateDemande = {
      id: loader.id,
      reFOpportunite: loader.opportunite.reference,
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
    <Box>
      <Grid container>
        <Grid size={6}>
          <Chip
            label={demande.refOpportunite}
            color="primary"
            sx={{ cursor: 'pointer', mr: 2 }}
            onDoubleClick={openOpportunite}
          />
          <Chip label={demande.client} color="primary" />
        </Grid>
        <Grid size={6} sx={{ textAlign: 'right' }}>
          <Chip label={getStatut(demande.statut)} />
        </Grid>
      </Grid>
      <Typography variant="caption">
        {`Créée le ${demande.createdAt?.toLocaleDateString()} par ${demande.createur.nom} ${demande.createur.prenom}`}
      </Typography>
      <br />
      <Typography variant="caption">
        {`Modifiée le ${demande.updatedAt?.toLocaleDateString()} par ${demande.gestionnaire.nom} ${demande.gestionnaire.prenom}`}
      </Typography>
      <Grid container spacing={2} mb={3} alignItems="flex-start">
        <Button color="primary" onClick={onLoadInstrument}>
          Charger Fichier
        </Button>
        {modification && (
          <Button color="secondary" onClick={saveDemande}>
            Enregistrer
          </Button>
        )}
      </Grid>
      {data && (
        <Box>
          <Grid container spacing={2} mb={3} alignItems="flex-start">
            <DisplayInfo info="date" label="Date demande" value={data.date?.toLocaleDateString()} />
            <DisplayInfo
              info="client"
              label="Client"
              value={data.client}
              error={data.client !== demande.client}
            />
            <DisplayInfo
              info="contact"
              label="Contact"
              value={data.contact}
              error={testContact()}
            />
            <DisplayInfo info="email" label="Email" value={data.email} />
            <DisplayInfo info="telephone" label="Télpéhone" value={data.telephone} />
            <DisplayInfo
              info="delaiDemande"
              label="Date souhaitée"
              value={data.delaiDemande?.toLocaleDateString()}
            />
          </Grid>
          <Grid container spacing={2} mb={3} alignItems="stretch">
            {data.instruments.map((inst, ind) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={ind}>
                <InstrumentCarte instrument={inst} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export const Route = createFileRoute('/demande/$id')({
  loader: async ({ params }): Promise<{ demande: Demande; opportunite: Opportunite | null }> => {
    try {
      if (Number.isNaN(parseInt(params.id))) redirect({ to: '/demande' })
      const demande = await ipcRendererService.invoke('demande.find', params.id)
      if (demande === null) redirect({ to: '/demande' })
      console.log(demande.refOpportunite)
      const opportunite = await ipcRendererService.invoke(
        'opportunite.search',
        demande.refOpportunite
      )
      return new Promise((resolve) => resolve({ demande, opportunite }))
    } catch (error) {
      return new Promise((_, reject) => reject(error))
    }
  },
  // Affichage du composant d'erreur de chargement
  errorComponent: ({ error }) => {
    return <ErrorComponent message={error.message} component="demande/$id" />
  },
  component: () => <DemandeId />
})
