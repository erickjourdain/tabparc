import { Autocomplete, TextField } from '@mui/material'
import loadData from '@renderer/utils/loader/admin'
import { useCallback, useEffect, useState } from 'react'
import { Control, FieldValue, FieldValues, useController } from 'react-hook-form'

interface AutocompleteSelectProps {
  control: Control<FieldValue<FieldValues>>
  name: string
  route: string
  label: string
  multiple?: boolean
  getOptionLabel: (option) => string
}

const AutocompleteSelect = <T,>({
  control,
  name,
  route,
  label,
  multiple,
  getOptionLabel
}: AutocompleteSelectProps) => {
  const { field, fieldState } = useController({ control, name })
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
      {...rest}
      value={value || null}
    />
  )
}

export default AutocompleteSelect
