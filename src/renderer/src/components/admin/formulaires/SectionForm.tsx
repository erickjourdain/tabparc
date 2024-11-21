import { Box, Button, FormControlLabel, Stack, Switch } from '@mui/material'
import Grid from '@mui/material/Grid2'
import InputForm from '@renderer/components/form/InputForm'
import { alertAtom } from '@renderer/store'
import { Section } from '@apptypes/index'
import { useNavigate } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type ISectionForm = {
  reference: number
  label?: string
  valide: boolean
}

type SectionFormProps = {
  section: Section | null
}

const SectionForm = ({ section }: SectionFormProps) => {
  // Hook de navigation
  const navigate = useNavigate()
  // Etat local de gestion de la sauvegarde
  const [isPending, setIsPending] = useState<boolean>(false)
  const setAlerte = useSetAtom(alertAtom)

  // Hook de définition du formulaire de gestion des utilisateurs
  const { control, handleSubmit, reset } = useForm<ISectionForm>({
    defaultValues: useMemo(() => {
      return {
        reference: section?.reference || 0,
        label: section?.label || '',
        valide: section?.valide || true
      }
    }, [section])
  })

  // Suivi de la mise à jour du section
  useEffect(() => {
    if (section) reset(section)
  }, [section])

  // Enregistrement réalisé
  const afterSave = useCallback(() => {
    setAlerte({ message: 'Section enregistrée', color: 'success' })
    setIsPending(false)
    navigate({ to: '/admin/sections' })
  }, [])

  // Enregistrement erreur
  const errorSave = useCallback((err) => {
    console.error(err)
    setIsPending(false)
    setAlerte({ message: "impossible de réaliser l'enregistrement", color: 'warning' })
  }, [])

  // Soumission du formulaire
  const onSubmit = async (data: ISectionForm) => {
    setIsPending(true)
    const value = {
      ...data,
      label: data.label?.trim().toLowerCase() || null
    }
    if (section?.id)
      await window.electron.ipcRenderer
        .invoke('section.update', {
          ...value,
          id: section.id
        })
        .then(afterSave)
        .catch(errorSave)
    else window.electron.ipcRenderer.invoke('section.save', value).then(afterSave).catch(errorSave)
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
          <Grid size={3}>
            <InputForm
              control={control}
              name="reference"
              type="number"
              rules={{
                required: 'La référence est obligatoire',
                min: {
                  value: 300,
                  message: 'La référence doit être supérieure à 300'
                },
                max: {
                  value: 399,
                  message: 'La référence doit être inférrieure à 400'
                }
              }}
            />
          </Grid>
          <Grid size={9}>
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
          <Grid size={12}>
            <InputForm
              control={control}
              name="label"
              rules={{
                minLength: {
                  value: 3,
                  message: 'Le label doit contenir au moins 3 caractères'
                },
                maxLength: {
                  value: 55,
                  message: 'Le label ne peut contenir plus de 55 caractères.'
                }
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={3} m={1} display="flex" alignItems="flex-start">
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="primary" type="submit" disabled={isPending}>
            {section?.id ? 'Mettre à jour' : 'Enregistrer'}
          </Button>
          <Button variant="contained" color="warning" onClick={() => reset()} disabled={isPending}>
            Reset
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default SectionForm
