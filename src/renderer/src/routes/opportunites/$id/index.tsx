import { Alert } from '@mui/material'
import TableBesoin from '@renderer/components/instrument/TableBesoin'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { useEffect } from 'react'

const OpportuniteID = () => {
  // Récupération des données de la route
  const { opportunite, opportuniteCRM } = useLoaderData({ from: '/opportunites/$id' })

  useEffect(() => console.log(opportunite), [opportunite])

  if (opportunite.besoins.length === 0)
    return (
      <Alert color="info" variant="standard">
        Aucune donnée client disponible. Charger un fichier client.
      </Alert>
    )

  return <TableBesoin data={opportunite.besoins} onSave={() => console.log('saving...')} />
}

export const Route = createFileRoute('/opportunites/$id/')({
  component: () => <OpportuniteID />
})
