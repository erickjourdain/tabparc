import { Alert, Box, Typography } from '@mui/material'

interface ErrorComponentProps {
  error: Error
  message: string
}

const ErrorComponent = ({ error, message }: ErrorComponentProps) => {
  return (
    <Box>
      <Alert variant="filled" color="error">
        {message}
      </Alert>
      <Typography mt={2} variant="overline" color="error">
        {error.message}
      </Typography>
    </Box>
  )
}

export default ErrorComponent
