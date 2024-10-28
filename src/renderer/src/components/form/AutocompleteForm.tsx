import { Autocomplete, TextField } from '@mui/material'
import loadData from '@renderer/utils/loader/admin'
import { useCallback, useEffect, useState } from 'react'
import { Control, FieldValue, FieldValues, RegisterOptions, useController } from 'react-hook-form'

interface AutocompleteFormProps {
  control: Control<FieldValue<FieldValues>>
  name: string
  route: string
  label: string
  rules?: Omit<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    RegisterOptions<any, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  multiple?: boolean
  getOptionLabel: (option) => string
}

const AutocompleteForm = <T,>({
  control,
  name,
  route,
  label,
  rules,
  multiple,
  getOptionLabel
}: AutocompleteFormProps) => {
  const { field, fieldState } = useController({ control, name, rules })
  const { onChange, value, ...rest } = field
  const [options, setOptions] = useState<T[]>([])

  // Chargement des options lors du changement de l'input
  const handleInputChange = useCallback(
    (inputValue: string) => {
      loadData({ page: 1, route, search: inputValue.trim() }).then((values) =>
        setOptions(values.data as T[])
      )
    },
    [name]
  )

  // Chargement des options au démarrage
  useEffect(() => handleInputChange(''), [])

  return (
    <Autocomplete
      {...rest}
      options={options}
      getOptionLabel={getOptionLabel}
      fullWidth
      includeInputInList
      autoComplete
      filterSelectedOptions
      multiple={!!multiple}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          helperText={fieldState.error?.message || ''}
          error={fieldState.error ? true : false}
        />
      )}
      onInputChange={(_ev, newValue) => handleInputChange(newValue)}
      filterOptions={(x) => x}
      onChange={(_e, newValue) => onChange(newValue ? newValue : null)}
      value={value || null}
    />
  )
}

export default AutocompleteForm
