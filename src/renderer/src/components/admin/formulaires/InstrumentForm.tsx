import { Box, Button, Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'
import InputForm from '@renderer/components/form/InputForm'
import SwitchForm from '@renderer/components/form/SwitchForm'
import { alertAtom } from '@renderer/store'
import { Instrument } from '@renderer/type'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

type InstrumentForm = {
  nom: string
  valide: boolean
}

type InstrumentFormProps = {
  instrument: Instrument | null
}

const InstrumentForm = ({ instrument }: InstrumentFormProps) => {
  // Hook de navigation
  const navigate = useNavigate()
  // Hook router
  const router = useRouter()
  // Etat local de gestion de la sauvegarde
  const [isPending, setIsPending] = useState<boolean>(false)
  const setAlerte = useSetAtom(alertAtom)

  // Hook de définition du formulaire de gestion des instruments
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<InstrumentForm>({
    defaultValues: useMemo(() => {
      return {
        reference: instrument?.nom || undefined,
        valide: instrument?.valide || true
      }
    }, [instrument])
  })

  // Suivi de la mise à jour de l'instrument
  useEffect(() => {
    if (instrument) reset(instrument)
  }, [instrument])

  // Enregistrement réalisé
  const afterSave = useCallback(() => {
    setAlerte({ message: 'Instrument enregistré', color: 'success' })
    setIsPending(false)
    navigate({ to: '/admin/instruments' })
  }, [])

  // Enregistrement erreur
  const errorSave = useCallback((err) => {
    console.error(err)
    setIsPending(false)
    setAlerte({ message: "impossible de réaliser l'enrergistrement", color: 'warning' })
  }, [])

  // Soumission du formulaire
  const onSubmit = async (data: InstrumentForm) => {
    setIsPending(true)
    const value = {
      ...data,
      nom: data.nom.trim().toLocaleLowerCase()
    }
    if (instrument?.id)
      await window.electron.ipcRenderer
        .invoke('instrument.update', {
          ...value,
          id: instrument.id
        })
        .then(afterSave)
        .catch(errorSave)
    else
      window.electron.ipcRenderer.invoke('instrument.save', value).then(afterSave).catch(errorSave)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ position: 'relative' }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} mb={3}>
          <Grid size={6}>
            <InputForm
              control={control}
              name="nom"
              rules={{
                required: 'Le nom est obligatoire',
                minLength: {
                  value: 3,
                  message: 'Le nom doit contenir au moins 3 caractères'
                },
                maxLength: {
                  value: 55,
                  message: 'Le nom ne peut contenir plus de 55 caractères.'
                }
              }}
            />
          </Grid>
          <Grid size={4}>
            <SwitchForm control={control} name="valide" />
          </Grid>
        </Grid>
      </Box>
      <Box mt={3} m={1} display="flex" alignItems="flex-start">
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="primary" type="submit" disabled={isPending}>
            {instrument?.id ? 'Mettre à jour' : 'Enregistrer'}
          </Button>
          <Button variant="contained" color="warning" onClick={() => reset()} disabled={isPending}>
            Reset
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default InstrumentForm
