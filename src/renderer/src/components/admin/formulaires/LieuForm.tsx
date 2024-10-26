import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Fab, Stack, TextField, Typography } from '@mui/material'
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
        site: lieu?.site || undefined,
        section: lieu?.section || undefined
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
      <Fab
        color="secondary"
        aria-label="back"
        size="small"
        sx={{ position: 'absolute', bottom: 10, right: 10 }}
        onClick={() => router.history.back()}
      >
        <ArrowBackIcon />
      </Fab>
      <Box display="flex" flexWrap="wrap" justifyContent="flex-start" mt="2">
        <Box sx={{ flex: '0 0 30%', m: 1 }}>
          <TextField
            id="site"
            label="nom"
            {...register('site', {
              required: 'Le site est obligatoire',
              minLength: {
                value: 3,
                message: 'Le site doit contenir au moins 3 caractères'
              },
              maxLength: {
                value: 55,
                message: 'Le site ne peut contenir plus de 55 caractères.'
              }
            })}
            error={errors.site ? true : false}
          />
          <Typography variant="inherit" color="error">
            {errors.site?.message}
          </Typography>
        </Box>
        <Box sx={{ flex: '0 0 30%', m: 1 }}>
          <TextField
            id="section"
            label="section"
            type="number"
            {...register('section', {
              required: 'La section est obligatoire',
              min: {
                value: 300,
                message: 'section >= 300'
              },
              max: {
                value: 500,
                message: 'section < 500'
              }
            })}
            error={errors.section ? true : false}
          />
          <Typography variant="inherit" color="error">
            {errors.section?.message}
          </Typography>
        </Box>
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
