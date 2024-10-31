import { TextField } from '@mui/material'
import { Control, FieldValue, FieldValues, RegisterOptions, useController } from 'react-hook-form'

interface InputFormProps {
  control: Control<FieldValue<FieldValues>>
  name: string
  type?: string
  rules?: Omit<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    RegisterOptions<any, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
}

const InputForm = ({ control, name, type, rules }: InputFormProps) => {
  const { field, fieldState } = useController({ control, name, rules })
  const { onChange, value, ...rest } = field

  return (
    <TextField
      {...rest}
      fullWidth
      label={name}
      value={value}
      type={type}
      onChange={onChange}
      helperText={fieldState.error?.message || ''}
      error={fieldState.error ? true : false}
      size="small"
    />
  )
}

export default InputForm
