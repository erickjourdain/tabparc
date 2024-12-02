import { Box, Button, Chip, Tooltip } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { createFileRoute, redirect, useLoaderData } from '@tanstack/react-router'
import { useState } from 'react'
import { DemandeClient, Opportunite, OpportuniteCRM } from '@apptypes/index'
import ipcRendererService from '@renderer/utils/ipcRendererService'
import ErrorComponent from '@renderer/components/ErrorComponent'
import { useSetAtom } from 'jotai'
import { alertAtom } from '@renderer/store'
import EventIcon from '@mui/icons-material/Event'
import PersonIcon from '@mui/icons-material/Person'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import TableInstrument from '@renderer/components/instrument/DataGrid'
import OpportuniteHeader from '@renderer/components/opportunite/OpportuniteHeader'

interface DisplayChipProps {
  value: string | null | undefined
  icon: React.ReactElement<unknown, string> | undefined
  error?: boolean
}

const DisplayChip = ({ value, icon, error = false }: DisplayChipProps) => {
  if (error)
    return (
      <Tooltip title="Incohérence avec l'opportunité">
        <Chip icon={icon} label={value} variant="outlined" color="warning" />
      </Tooltip>
    )
  else return <Chip icon={icon} label={value} variant="outlined" color="default" />
}

const OpportuniteID = () => {
  // Récupération des données de la route
  const { opportunite, opportuniteCRM } = useLoaderData({ from: '/opportunites/$id' })

  const [data, setData] = useState<DemandeClient>()
  const [modification, setModification] = useState<boolean>(false)
  const setAlerte = useSetAtom(alertAtom)

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
      <OpportuniteHeader opportunite={opportunite} opportuniteCRM={opportuniteCRM} />
      <Grid container spacing={2} mb={3} alignItems="flex-start">
        {opportunite.besoins.length === 0 && (
          <Button color="primary" onClick={onLoadInstrument}>
            Charger Fichier
          </Button>
        )}
        {modification && (
          <Button color="secondary" onClick={saveDemande}>
            Enregistrer
          </Button>
        )}
      </Grid>
      {data && (
        <Box>
          <Grid container spacing={2} mb={3} alignItems="flex-start">
            <DisplayChip value={data.date?.toLocaleDateString()} icon={<EventIcon />} />
            <DisplayChip value={data.contact} error={testContact()} icon={<PersonIcon />} />
            <DisplayChip value={data.email} icon={<AlternateEmailIcon />} />
            <DisplayChip value={data.telephone} icon={<LocalPhoneIcon />} />
            <DisplayChip
              value={data.dateSouhaitee?.toLocaleDateString()}
              icon={<EventAvailableIcon />}
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
        params.id,
        ['besoins']
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
