import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Box,
  Button,
  Fab,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { alertAtom } from '@renderer/store'
import { Accreditation } from '@renderer/type'
import { useNavigate, useRouter } from '@tanstack/react-router'
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
      await window.electronAPI
        .updateAccreditation({
          ...value,
          id: accreditation.id
        })
        .then(afterSave)
        .catch(errorSave)
    else window.electronAPI.createAccreditation(value).then(afterSave).catch(errorSave)
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
        <Box sx={{ flex: '0 0 50%', m: 1 }}>
          <TextField
            id="nom"
            label="nom"
            fullWidth
            {...register('reference', {
              required: 'La référence est obligatoire',
              minLength: {
                value: 3,
                message: 'La référence doit contenir au moins 3 caractères'
              },
              maxLength: {
                value: 55,
                message: 'La référence ne peut contenir plus de 55 caractères.'
              }
            })}
            error={errors.reference ? true : false}
          />
          <Typography variant="inherit" color="error">
            {errors.reference?.message}
          </Typography>
        </Box>
        <Box sx={{ flex: '0 0 30%', m: 1 }}>
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
        </Box>
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
