import { Box, Button, FormControlLabel, Stack, Switch } from '@mui/material'
import Grid from '@mui/material/Grid2'
import InputForm from '@renderer/components/form/InputForm'
import { alertAtom } from '@renderer/store'
import { Accreditation } from '@renderer/type'
import { useNavigate } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type IAccreditationForm = {
  reference: string
  valide: boolean
}

type AccreditationFormProps = {
  accreditation: Accreditation | null
}

const AccreditationForm = ({ accreditation }: AccreditationFormProps) => {
  // Hook de navigation
  const navigate = useNavigate()
  // Etat local de gestion de la sauvegarde
  const [isPending, setIsPending] = useState<boolean>(false)
  const setAlerte = useSetAtom(alertAtom)

  // Hook de définition du formulaire de gestion des utilisateurs
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<IAccreditationForm>({
    defaultValues: useMemo(() => {
      return {
        reference: accreditation?.reference || undefined,
        valide: accreditation?.valide || true
      }
    }, [accreditation])
  })

  // Suivi de la mise à jour de l'accréditation
  useEffect(() => {
    if (accreditation) reset(accreditation)
  }, [accreditation])

  // Enregistrement réalisé
  const afterSave = useCallback(() => {
    setAlerte({ message: 'Accréditation enregistrée', color: 'success' })
    setIsPending(false)
    navigate({ to: '/admin/accreditations' })
  }, [])

  // Enregistrement erreur
  const errorSave = useCallback((err) => {
    console.error(err)
    setIsPending(false)
    setAlerte({ message: "impossible de réaliser l'enregistrement", color: 'warning' })
  }, [])

  // Soumission du formulaire
  const onSubmit = async (data: IAccreditationForm) => {
    setIsPending(true)
    const value = {
      ...data,
      reference: data.reference.trim().toUpperCase()
    }
    if (accreditation?.id)
      await window.electron.ipcRenderer
        .invoke('accreditation.update', {
          ...value,
          id: accreditation.id
        })
        .then(afterSave)
        .catch(errorSave)
    else
      window.electron.ipcRenderer
        .invoke('accreditation.save', value)
        .then(afterSave)
        .catch(errorSave)
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
              name="reference"
              rules={{
                required: 'La référence est obligatoire',
                minLength: {
                  value: 3,
                  message: 'La référence doit contenir au moins 3 caractères'
                },
                maxLength: {
                  value: 55,
                  message: 'La référence ne peut contenir plus de 55 caractères.'
                }
              }}
            />
          </Grid>
          <Grid size={4}>
            <Controller
              name="valide"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControlLabel
                  control={<Switch checked={value} onChange={onChange} />}
                  label="valide"
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={3} m={1} display="flex" alignItems="flex-start">
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="primary" type="submit" disabled={isPending}>
            {accreditation?.id ? 'Mettre à jour' : 'Enregistrer'}
          </Button>
          <Button variant="contained" color="warning" onClick={() => reset()} disabled={isPending}>
            Reset
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default AccreditationForm
