import { Box, Button, Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'
import InputForm from '@renderer/components/form/InputForm'
import { alertAtom } from '@renderer/store'
import { Lieu } from '@renderer/type'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

type ILieuForm = {
  site: string
  section: number
}

type LieuFormProps = {
  lieu: Lieu | null
}

const LieuForm = ({ lieu }: LieuFormProps) => {
  // Hook de navigation
  const navigate = useNavigate()
  // Hook router
  const router = useRouter()
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
  } = useForm<ILieuForm>({
    defaultValues: useMemo(() => {
      return {
        site: lieu?.site || '',
        section: lieu?.section || 0
      }
    }, [lieu])
  })

  // Suivi de la mise à jour du lieu
  useEffect(() => {
    if (lieu) reset(lieu)
  }, [lieu])

  // Enregistrement réalisé
  const afterSave = useCallback(() => {
    setAlerte({ message: 'Lieu enregistré', color: 'success' })
    setIsPending(false)
    navigate({ to: '/admin/lieux' })
  }, [])

  // Enregistrement erreur
  const errorSave = useCallback((err) => {
    console.error(err)
    setIsPending(false)
    setAlerte({ message: "impossible de réaliser l'enrergistrement", color: 'warning' })
  }, [])

  // Soumission du formulaire
  const onSubmit = async (data: ILieuForm) => {
    setIsPending(true)
    const value = {
      ...data,
      site: data.site.trim().toUpperCase()
    }
    if (lieu?.id)
      await window.electron.ipcRenderer
        .invoke('lieu.update', {
          ...value,
          id: lieu.id
        })
        .then(afterSave)
        .catch(errorSave)
    else window.electron.ipcRenderer.invoke('lieu.save', value).then(afterSave).catch(errorSave)
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
          <Grid size={4}>
            <InputForm
              control={control}
              name="site"
              rules={{
                required: 'Le site est obligatoire',
                minLength: {
                  value: 3,
                  message: 'Le site doit contenir au moins 3 caractères'
                },
                maxLength: {
                  value: 55,
                  message: 'Le site ne peut contenir plus de 55 caractères.'
                }
              }}
            />
          </Grid>
          <Grid size={4}>
            <InputForm
              control={control}
              name="section"
              type="number"
              rules={{
                required: 'La section est obligatoire',
                min: {
                  value: 300,
                  message: 'section >= 300'
                },
                max: {
                  value: 500,
                  message: 'section < 500'
                }
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={3} m={1} display="flex" alignItems="flex-start">
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="primary" type="submit" disabled={isPending}>
            {lieu?.id ? 'Mettre à jour' : 'Enregistrer'}
          </Button>
          <Button variant="contained" color="warning" onClick={() => reset()} disabled={isPending}>
            Reset
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default LieuForm
