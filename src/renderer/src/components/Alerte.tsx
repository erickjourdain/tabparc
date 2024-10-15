import { Alert, Snackbar } from '@mui/material'
import { alertAtom } from '@renderer/store'
import { useAtom } from 'jotai'
import { useCallback } from 'react'

const Alerte = () => {
  const [alerte, setAlerte] = useAtom(alertAtom)

  const handleClose = useCallback(() => {
    setAlerte(null)
  }, [])

  return (
    <Snackbar
      open={!!alerte}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={2500}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={alerte?.color || 'info'}
        variant="filled"
        sx={{ width: '100%' }}
        icon={false}
      >
        {alerte?.message}
      </Alert>
    </Snackbar>
  )
}

export default Alerte
