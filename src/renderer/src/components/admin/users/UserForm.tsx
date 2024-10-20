import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Box,
  Button,
  Fab,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { alertAtom } from '@renderer/store'
import { User, UserRole } from '@renderer/type'
import { wordLetterUpperCase } from '@renderer/utils/format'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type IUserForm = {
  nom: string
  prenom: string
  login: string
  email: string
  role: UserRole
  valide: boolean
}

type UserFormProps = {
  user: User | null
}

const UserForm = ({ user }: UserFormProps) => {
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
  } = useForm<IUserForm>({
    defaultValues: useMemo(() => {
      return {
        nom: user?.nom || undefined,
        prenom: user?.prenom || undefined,
        login: user?.login || undefined,
        email: user?.email || undefined,
        role: user?.role || UserRole.USER,
        valide: user?.valide || true
      }
    }, [user])
  })

  // Suivi de la mise à jour de l'utilisateur
  useEffect(() => {
    if (user) reset(user)
  }, [user])

  // Enregistrement réalisé
  const afterSave = useCallback(() => {
    setAlerte({ message: 'Utilisateur enregistré', color: 'success' })
    setIsPending(false)
    navigate({ to: '/admin/users' })
  }, [])

  // Enregistrement erreur
  const errorSave = useCallback((err) => {
    console.error(err)
    setIsPending(false)
    setAlerte({ message: "impossible de réaliser l'enregistrement", color: 'warning' })
  }, [])

  // Soumission du formulaire
  const onSubmit = async (data: IUserForm) => {
    setIsPending(true)
    const value = {
      ...data,
      nom: data.nom.trim().toUpperCase(),
      prenom: wordLetterUpperCase(data.prenom),
      login: data.login.trim().toLowerCase(),
      email: data.email.trim().toLowerCase()
    }
    if (user?.id)
      await window.electronAPI
        .updateUser({
          ...data,
          id: user.id
        })
        .then(afterSave)
        .catch(errorSave)
    else window.electronAPI.createUser(data).then(afterSave).catch(errorSave)
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
            id="nom"
            label="nom"
            {...register('nom', {
              required: 'Le nom est obligatoire',
              minLength: {
                value: 3,
                message: 'Le nom doit contenir au moins 3 caractères'
              },
              maxLength: {
                value: 55,
                message: 'Le nom ne peut contenir plus de 55 caractères.'
              }
            })}
            error={errors.nom ? true : false}
          />
          <Typography variant="inherit" color="error">
            {errors.nom?.message}
          </Typography>
        </Box>
        <Box sx={{ flex: '0 0 30%', m: 1 }}>
          <TextField
            id="prenom"
            label="prenom"
            {...register('prenom', {
              required: 'Le prénom est obligatoire',
              minLength: {
                value: 3,
                message: 'Le prénom doit contenir au moins 3 caractères'
              },
              maxLength: {
                value: 55,
                message: 'Le prénom ne peut contenir plus de 55 caractères.'
              }
            })}
            error={errors.prenom ? true : false}
          />
          <Typography variant="inherit" color="error">
            {errors.prenom?.message}
          </Typography>
        </Box>
        <Box sx={{ flex: '0 0 30%', m: 1 }}>
          <TextField
            id="login"
            label="login"
            {...register('login', {
              required: 'Le login est obligatoire',
              minLength: {
                value: 3,
                message: 'Le login doit contenir au moins 3 caractères'
              }
            })}
            error={errors.login ? true : false}
          />
          <Typography variant="inherit" color="error">
            {errors.login?.message}
          </Typography>
        </Box>
        <Box sx={{ flex: '0 0 30%', m: 1 }}>
          <TextField
            id="email"
            label="email"
            {...register('email', {
              required: "L'email est obligatoire",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "L'adresse email est invalide"
              }
            })}
            error={errors.email ? true : false}
          />
          <Typography variant="inherit" color="error">
            {errors.email?.message}
          </Typography>
        </Box>
        <Box sx={{ flex: '0 0 30%', m: 1 }}>
          <Controller
            name="valide"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControlLabel
                control={<Switch checked={value} onChange={onChange} />}
                label="validé"
              />
            )}
          />
        </Box>
        <Box sx={{ flex: '0 0 30%', m: 1 }}>
          <FormControl>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel id="role-select-label">role</InputLabel>
                  <Select id="role-select" labelId="role-select-label" label="role" {...field}>
                    {Object.entries(UserRole).map(([key, value]) => (
                      <MenuItem value={value} key={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            />
          </FormControl>
        </Box>
      </Box>
      <Box mt={3} m={1} display="flex" alignItems="flex-start">
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="primary" type="submit" disabled={isPending}>
            {user?.id ? 'Mettre à jour' : 'Enregistrer'}
          </Button>
          <Button variant="contained" color="warning" onClick={() => reset()} disabled={isPending}>
            Reset
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default UserForm
