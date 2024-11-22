import { Alert } from '@mui/material'
import { alertAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

interface ErrorComponentProps {
  message: string
  component: string
}

const ErrorComponent = ({ message, component }: ErrorComponentProps) => {
  const setAlerte = useSetAtom(alertAtom)

  useEffect(() => {
    setAlerte({ message, color: 'error' })
  }, [message])

  return (
    <Alert variant="filled" color="error">
      Erreur durant le chargement du composant {component}
    </Alert>
  )
}

export default ErrorComponent
