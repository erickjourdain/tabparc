import { Box, Button, Stack } from '@mui/material'
import Grid from '@mui/material/Grid2'
import AutocompleteForm from '@renderer/components/form/AutocompleteForm'
import InputForm from '@renderer/components/form/InputForm'
import { alertAtom } from '@renderer/store'
import { Accreditation, Contact, Grandeur, FamilleInstrument, Lieu } from '@renderer/type'
import settings from '@renderer/utils/settings'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FindManyOptions } from 'typeorm'

type IGrandeurForm = {
  nom: string
  accreditation: Accreditation | null
  contacts: Contact[]
  lieu: Lieu | null
  instruments: FamilleInstrument[]
}

type GrandeurFormProps = {
  grandeur: Grandeur | null
}

const filter: FindManyOptions<unknown> = {
  skip: 0,
  take: settings.nbElements
}

const GrandeurForm = ({ grandeur }: GrandeurFormProps) => {
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
  } = useForm<IGrandeurForm>({
    defaultValues: useMemo(() => {
      return {
        nom: grandeur?.nom || '',
        accreditation: grandeur?.accreditation || null,
        contacts: grandeur?.contacts || [],
        lieu: grandeur?.lieu || null,
        instruments: grandeur?.instruments || []
      }
    }, [grandeur])
  })

  // Suivi de la mise à jour de la grandeur
  useEffect(() => {
    if (grandeur) reset(grandeur)
  }, [grandeur])

  // Enregistrement réalisé
  const afterSave = useCallback(() => {
    setAlerte({ message: 'Accréditation enregistrée', color: 'success' })
    setIsPending(false)
    navigate({ to: '/admin/grandeurs' })
  }, [])

  // Enregistrement erreur
  const errorSave = useCallback((err) => {
    console.error(err)
    setIsPending(false)
    setAlerte({ message: "impossible de réaliser l'enregistrement", color: 'warning' })
  }, [])

  // Soumission du formulaire
  const onSubmit = async (data: IGrandeurForm) => {
    setIsPending(true)
    const value = {
      ...data,
      nom: data.nom.trim().toUpperCase(),
      accreditation: data.accreditation,
      contacts: data.contacts,
      lieu: data.lieu,
      instruments: data.instruments
    }
    if (grandeur?.id)
      await window.electron.ipcRenderer
        .invoke('grandeur.update', {
          ...value,
          id: grandeur.id
        })
        .then(afterSave)
        .catch(errorSave)
    else window.electron.ipcRenderer.invoke('grandeur.save', value).then(afterSave).catch(errorSave)
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
            <AutocompleteForm
              control={control}
              name="accreditation"
              route="accreditation"
              label="reference"
              getOptionLabel={(option: Accreditation) => option.reference}
            />
          </Grid>
          <Grid size={4}>
            <AutocompleteForm
              control={control}
              name="lieu"
              route="lieu"
              label="site"
              rules={{ required: 'Le site est obligatoire' }}
              getOptionLabel={(option: Lieu) => `${option.section} - ${option.site}`}
            />
          </Grid>
          <Grid size={12}>
            <AutocompleteForm
              control={control}
              name="contacts"
              route="contact"
              label="contacts"
              rules={{ required: 'Sélectionner au moins un contact' }}
              getOptionLabel={(option: Contact) => `${option.prenom} ${option.nom}`}
              multiple={true}
            />
          </Grid>
          <Grid size={12}>
            <AutocompleteForm
              control={control}
              name="famille-instruments"
              route="famille-instrument"
              label="famille instruments"
              getOptionLabel={(option: FamilleInstrument) => option.nom}
              multiple={true}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={3} m={1} display="flex" alignItems="flex-start">
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="primary" type="submit" disabled={isPending}>
            {grandeur?.id ? 'Mettre à jour' : 'Enregistrer'}
          </Button>
          <Button variant="contained" color="warning" onClick={() => reset()} disabled={isPending}>
            Reset
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default GrandeurForm
