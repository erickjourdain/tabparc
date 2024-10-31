import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Control, FieldValue, FieldValues, useController } from 'react-hook-form'

interface SelectFormProps {
  control: Control<FieldValue<FieldValues>>
  name: string
  options: Record<string, string>
}

const SelectForm = ({ control, name, options }: SelectFormProps) => {
  const { field, fieldState } = useController({
    control,
    name,
    rules: { required: 'La sélection est obligatoire' }
  })
  const { onChange, value, ...rest } = field

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-select-label`}>{name}</InputLabel>
      <Select
        id={`${name}-select`}
        labelId={`${name}-select-label`}
        label={name}
        {...field}
        onChange={onChange}
        size="small"
      >
        {Object.entries(options).map(([key, value]) => (
          <MenuItem value={value} key={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectForm
