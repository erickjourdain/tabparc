import { Box, Button, Chip, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Demande, Statut } from '@renderer/type'
import { getStatut } from '@renderer/utils/format'
import { createFileRoute, redirect, useLoaderData } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { DataInstrument } from '@preload/types'
import InstrumentCarte from '@renderer/components/instrument/Carte'

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
  const loader = useLoaderData({ from: '/demande/$id' })

  const [data, setData] = useState<DataInstrument>()
  const [modification, setModification] = useState<boolean>(false)

  // Ouverture du répertoire de l'opportunité
  const openOpportunite = () => {
    window.electron.ipcRenderer.invoke('directory.openOpportunite', loader.opportunite.reference)
  }

  // Lancement chargement des instruments
  const onLoadInstrument = async () => {
    const data = await window.electron.ipcRenderer.invoke(
      'instrument.load',
      loader.opportunite.reference
    )
    setData(data)
    setModification(true)
  }

  // Tester cohérence contact fichier et opportunité
  const testContact = () => {
    if (data === undefined || data.contact === null) return true
    else
      return (
        data.contact
          .toLocaleLowerCase()
          .indexOf(loader.opportunite.contactNom.toLocaleLowerCase()) < 0
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
            label={loader.opportunite.reference}
            color="primary"
            sx={{ cursor: 'pointer', mr: 2 }}
            onDoubleClick={openOpportunite}
          />
          <Chip label={loader.opportunite.client} color="primary" />
        </Grid>
        <Grid size={6} sx={{ textAlign: 'right' }}>
          <Chip label={getStatut(loader.statut)} />
        </Grid>
      </Grid>
      <Typography variant="caption">
        {`Créée le ${loader.createdAt.toLocaleDateString()} par ${loader.createur.nom} ${loader.createur.prenom}`}
      </Typography>
      <br />
      <Typography variant="caption">
        {`Modifiée le ${loader.updatedAt.toLocaleDateString()} par ${loader.gestionnaire.nom} ${loader.gestionnaire.prenom}`}
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
              error={data.client !== loader.opportunite.client}
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
  loader: async ({ params }): Promise<Demande> => {
    if (Number.isNaN(parseInt(params.id))) redirect({ to: '/demande' })
    const demande = await window.electron.ipcRenderer.invoke('demande.find', params.id)
    if (demande === null) redirect({ to: '/demande' })
    console.log(demande)
    return demande as Demande
  },
  component: () => <DemandeId />
})
