import { FormControlLabel, Switch } from '@mui/material'
import { Control, FieldValue, FieldValues, useController } from 'react-hook-form'

interface SwitchFormProps {
  control: Control<FieldValue<FieldValues>>
  name: string
}

const SwitchForm = ({ control, name }: SwitchFormProps) => {
  const { field } = useController({ control, name })
  const { onChange, value, ...rest } = field

  return (
    <FormControlLabel
      {...rest}
      control={<Switch checked={value} onChange={onChange} />}
      label={name}
    />
  )
}

export default SwitchForm
