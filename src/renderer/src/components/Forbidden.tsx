import { Alert } from '@mui/material'

const Forbidden = () => {
  return (
    <Alert severity="error">
      Vous ne disposez pas des droits pour accéder à l&apos;application
    </Alert>
  )
}

export default Forbidden
