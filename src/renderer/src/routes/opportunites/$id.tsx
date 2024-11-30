import { Box, Button, Chip, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { getStatut } from '@renderer/utils/format'
import { createFileRoute, redirect, useLoaderData } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { DemandeClient, Opportunite, OpportuniteCRM } from '@apptypes/index'
import ipcRendererService from '@renderer/utils/ipcRendererService'
import ErrorComponent from '@renderer/components/ErrorComponent'
import { useSetAtom } from 'jotai'
import { alertAtom } from '@renderer/store'
import TableInstrument from '@renderer/components/instrument/TableInstruments'

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

const OpportuniteID = () => {
  // Récupération des données de la route
  const { opportunite, opportuniteCRM } = useLoaderData({ from: '/opportunites/$id' })

  const [data, setData] = useState<DemandeClient>()
  const [modification, setModification] = useState<boolean>(false)
  const setAlerte = useSetAtom(alertAtom)

  // Ouverture du répertoire de l'opportunité
  const openOpportuniteCRM = () => {
    ipcRendererService.invoke('directory.openOpportuniteCRM', opportuniteCRM?.reference)
  }

  // Lancement chargement des instruments
  const onLoadInstrument = async () => {
    ipcRendererService
      .invoke('instrument.load', opportuniteCRM?.reference)
      .then((data: DemandeClient) => {
        setData(data)
        setModification(true)
      })
      .catch((error) => setAlerte({ message: error.message, color: 'error' }))
  }

  // Tester cohérence contact fichier et opportunité
  const testContact = () => {
    if (data === undefined || data.contact === null || opportuniteCRM === null) return true
    else
      return (
        data.contact.toLocaleLowerCase().indexOf(opportuniteCRM.contactNom.toLocaleLowerCase()) < 0
      )
  }

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
              error={data.client !== opportunite.client}
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
              value={data.dateSouhaitee?.toLocaleDateString()}
            />
          </Grid>
          <TableInstrument data={data} />
        </Box>
      )}
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
        params.id
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
