import { DemandeClient } from '@apptypes/index'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'

interface TableProps {
  data: DemandeClient
}

const columns: GridColDef[] = [
  { field: 'designation', headerName: 'Désignation', width: 150 },
  { field: 'fabricant', headerName: 'Fabricant', width: 150 },
  { field: 'modele', headerName: 'Modèle', width: 150 },
  { field: 'numSerie', headerName: 'N° Série', width: 150 },
  { field: 'refClient', headerName: 'Référence', width: 150 },
  { field: 'precedentCE', headerName: 'Précédent CE', width: 150 },
  { field: 'ptsMesures', headerName: 'Poinst mesures', width: 150 },
  { field: 'typePrestation', headerName: 'Prestation', width: 150 },
  { field: 'emt', headerName: 'EMT', width: 150 },
  { field: 'periodicite', headerName: 'Périodicité', width: 150 },
  {
    field: 'dateSouhaitee',
    valueGetter: (value: Date) => value.toLocaleDateString(),
    headerName: 'Date',
    width: 150
  },
  { field: 'contact', headerName: 'Contact', width: 150 },
  { field: 'email', headerName: 'email', width: 150 },
  { field: 'telephone', headerName: 'Téléphone', width: 150 }
]

function generateRandom() {
  const length = 8
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let retVal = ''
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal
}

const TableInstrument = ({ data }: TableProps) => {
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 450,
          width: '100%',
          paddingLeft: '40px',
          paddingRight: '40px'
        }}
      >
        <DataGrid rows={data.instruments} columns={columns} getRowId={() => generateRandom()} />
      </div>
    </div>
  )
}

export default TableInstrument
