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
import { Contact } from '@renderer/type'
import { wordLetterUpperCase } from '@renderer/utils/format'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type IContactForm = {
  nom: string
  prenom: string
  email: string
  telephone: string
  valide: boolean
}

type ContactFormProps = {
  contact: Contact | null
}

const ContactForm = ({ contact }: ContactFormProps) => {
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
  } = useForm<IContactForm>({
    defaultValues: useMemo(() => {
      return {
        nom: contact?.nom || undefined,
        prenom: contact?.prenom || undefined,
        email: contact?.email || undefined,
        telephone: contact?.telephone || undefined,
        valide: contact?.valide || true
      }
    }, [contact])
  })

  // Suivi de la mise à jour du contact
  useEffect(() => {
    if (contact) reset(contact)
  }, [contact])

  // Enregistrement réalisé
  const afterSave = useCallback(() => {
    setAlerte({ message: 'Contact enregistré', color: 'success' })
    setIsPending(false)
    navigate({ to: '/admin/contacts' })
  }, [])

  // Enregistrement erreur
  const errorSave = useCallback((err) => {
    console.error(err)
    setIsPending(false)
    setAlerte({ message: "impossible de réaliser l'enregistrement", color: 'warning' })
  }, [])

  // Soumission du formulaire
  const onSubmit = async (data: IContactForm) => {
    setIsPending(true)
    const value = {
      ...data,
      nom: data.nom.trim().toUpperCase(),
      prenom: wordLetterUpperCase(data.prenom),
      telephone: data.telephone.trim(),
      email: data.email.trim().toLowerCase()
    }
    if (contact?.id)
      await window.electron.ipcRenderer
        .invoke('contact.update', {
          ...value,
          id: contact.id
        })
        .then(afterSave)
        .catch(errorSave)
    else window.electron.ipcRenderer.invoke('contact.save', value).then(afterSave).catch(errorSave)
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
            id="telephone"
            label="telephone"
            {...register('telephone', {
              required: 'Le telephone est obligatoire',
              pattern: {
                value: /^(?:\+33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
                message: 'Le numéro de téléphone est invalide'
              }
            })}
            error={errors.telephone ? true : false}
          />
          <Typography variant="inherit" color="error">
            {errors.telephone?.message}
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
                label="valide"
              />
            )}
          />
        </Box>
      </Box>
      <Box mt={3} m={1} display="flex" alignItems="flex-start">
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="primary" type="submit" disabled={isPending}>
            {contact?.id ? 'Mettre à jour' : 'Enregistrer'}
          </Button>
          <Button variant="contained" color="warning" onClick={() => reset()} disabled={isPending}>
            Reset
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default ContactForm
