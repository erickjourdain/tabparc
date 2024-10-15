import {
  Box,
  Button,
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
import { useSetAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
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
        valide: user?.valide || undefined
      }
    }, [user])
  })

  // Suivi de la mise à jour de l'utilisateur
  useEffect(() => {
    if (user) reset(user)
  }, [user])

  // Soumission du formulaire
  const onSubmit = async (data: IUserForm) => {
    setIsPending(true)
    if (user?.id) await window.electronAPI.updateUser({ ...data, id: user.id })
    else window.electronAPI.createUser(data)
    setAlerte({ message: 'Utilisateur enregistré', color: 'success' })
    setIsPending(false)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-around"
        sx={{
          mt: 2,
          '& .MuiTextField-root': { flex: '0 0 30%', m: 1 },
          '& .MuiFormControl-root': { flex: '0 0 30%', m: 1 },
          '& .MuiFormControlLabel-root': { flex: '0 0 30%', m: 1 }
        }}
      >
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
