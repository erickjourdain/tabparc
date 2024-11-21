import { Box, Button, FormControlLabel, Stack, Switch } from '@mui/material'
import Grid from '@mui/material/Grid2'
import InputForm from '@renderer/components/form/InputForm'
import { alertAtom } from '@renderer/store'
import { Site } from '@apptypes/index'
import { useNavigate } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { wordLetterUpperCase } from '@renderer/utils/format'

type ISiteForm = {
  nom: string
  adresse?: string
  telephone?: string
  valide: boolean
}

type SiteFormProps = {
  site: Site | null
}

const SiteForm = ({ site }: SiteFormProps) => {
  // Hook de navigation
  const navigate = useNavigate()
  // Etat local de gestion de la sauvegarde
  const [isPending, setIsPending] = useState<boolean>(false)
  const setAlerte = useSetAtom(alertAtom)

  // Hook de définition du formulaire de gestion des utilisateurs
  const { control, handleSubmit, reset } = useForm<ISiteForm>({
    defaultValues: useMemo(() => {
      return {
        nom: site?.nom || '',
        adresse: site?.adresse || '',
        telephone: site?.telephone || '',
        valide: site?.valide || true
      }
    }, [site])
  })

  // Suivi de la mise à jour du site
  useEffect(() => {
    if (site) reset(site)
  }, [site])

  // Enregistrement réalisé
  const afterSave = useCallback(() => {
    setAlerte({ message: 'Site enregistré', color: 'success' })
    setIsPending(false)
    navigate({ to: '/admin/sites' })
  }, [])

  // Enregistrement erreur
  const errorSave = useCallback((err) => {
    console.error(err)
    setIsPending(false)
    setAlerte({ message: "impossible de réaliser l'enregistrement", color: 'warning' })
  }, [])

  // Soumission du formulaire
  const onSubmit = async (data: ISiteForm) => {
    setIsPending(true)
    const value = {
      ...data,
      nom: wordLetterUpperCase(data.nom.trim())
    }
    if (site?.id)
      await window.electron.ipcRenderer
        .invoke('site.update', {
          ...value,
          id: site.id
        })
        .then(afterSave)
        .catch(errorSave)
    else window.electron.ipcRenderer.invoke('site.save', value).then(afterSave).catch(errorSave)
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
          <Grid size={6}>
            <InputForm
              control={control}
              name="telephone"
              rules={{
                pattern: {
                  value: /^(?:\+33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
                  message: 'Le numéro de téléphone est invalide'
                }
              }}
            />
          </Grid>
          <Grid size={12}>
            <InputForm
              control={control}
              name="adresse"
              rules={{
                minLength: {
                  value: 25,
                  message: "L'adresse doit contenir au moins 25 caractères"
                },
                maxLength: {
                  value: 255,
                  message: "L'adresse ne peut contenir plus de 255 caractères."
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
            {site?.id ? 'Mettre à jour' : 'Enregistrer'}
          </Button>
          <Button variant="contained" color="warning" onClick={() => reset()} disabled={isPending}>
            Reset
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default SiteForm
