import { EnteteDemande } from '@apptypes/index'
import { Box, Chip, Grid2 as Grid, Tooltip } from '@mui/material'
import ErrorComponent from '@renderer/components/ErrorComponent'
import ipcRendererService from '@renderer/utils/ipcRendererService'
import { createFileRoute, useBlocker, useLoaderData, useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import EventIcon from '@mui/icons-material/Event'
import PersonIcon from '@mui/icons-material/Person'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import TableInstrument from '@renderer/components/instrument/TableDemande'
import { useSetAtom } from 'jotai'
import { alertAtom } from '@renderer/store'

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

const ChargementDemande = () => {
  // Hook de navigation
  const navigate = useNavigate()

  // Hook de gestion des alartes
  const setAlert = useSetAtom(alertAtom)

  // Récupération des données de la route
  const { opportunite, opportuniteCRM } = useLoaderData({ from: '/opportunites/$id' })
  const demande = useLoaderData({ from: '/opportunites/$id/chargement/$oppRef' })

  // Gestion de l'état de l'enregistrement des données
  const [newData, setNewData] = useState<boolean>(true)
  useEffect(() => {
    setNewData(true)
  }, [demande])

  // Blocakage de la navigation en cas de non sauvegarde des données
  useBlocker({
    blockerFn: () =>
      window.confirm(
        'Les données ne sont pas sauvegardées.\nSouhaitez-vous vraiment quitter sans sauvegarder?'
      ),
    condition: newData
  })

  // Tester cohérence contact fichier et opportunité
  const testContact = useCallback(() => {
    if (demande === undefined || demande.contact === null || opportuniteCRM === null) return true
    else
      return (
        demande.contact.toLocaleLowerCase().indexOf(opportuniteCRM.contactNom.toLocaleLowerCase()) <
        0
      )
  }, [])

  // Sauvegarde des données
  const handleSave = useCallback(() => {
    ipcRendererService
      .invoke('demande.create', opportunite.id, demande)
      .then(() => {
        setNewData(false)
        setTimeout(() => navigate({ to: `/opportunites/${opportunite.id}` }), 250)
      })
      .catch((error) => setAlert({ color: 'error', message: error.message }))
  }, [])

  return (
    <Box>
      <Grid container spacing={2} mb={3} alignItems="flex-start">
        <DisplayChip value={demande.date?.toLocaleDateString()} icon={<EventIcon />} />
        <DisplayChip value={demande.contact} error={testContact()} icon={<PersonIcon />} />
        <DisplayChip value={demande.email} icon={<AlternateEmailIcon />} />
        <DisplayChip value={demande.telephone} icon={<LocalPhoneIcon />} />
        <DisplayChip
          value={demande.dateSouhaitee?.toLocaleDateString()}
          icon={<EventAvailableIcon />}
        />
      </Grid>
      <TableInstrument data={demande.demandes} onSave={handleSave} />
    </Box>
  )
}

export const Route = createFileRoute('/opportunites/$id/chargement/$oppRef')({
  loader: async ({ params }): Promise<EnteteDemande> => {
    try {
      return await ipcRendererService.invoke('instrument.load', params.oppRef)
    } catch (error) {
      return new Promise((_, reject) => reject(error))
    }
  },
  // Affichage du composant d'erreur de chargement
  errorComponent: ({ error }) => {
    return <ErrorComponent error={error} message="Impossible de charger le fichier sélectionné" />
  },
  component: () => <ChargementDemande />
})
