import { Demande } from '@apptypes/index'
import SaveIcon from '@mui/icons-material/Save'
import { Button } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton
} from '@mui/x-data-grid'

interface TableProps {
  data: Demande[]
  onSave: () => void
}

interface CustomToolBarProps {
  onSave: () => void
}

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    onSave: () => void
  }
}

const columns: GridColDef[] = [
  { field: 'numLigne', headerName: 'Ligne', width: 75 },
  { field: 'designation', headerName: 'Désignation', width: 200 },
  { field: 'fabricant', headerName: 'Fabricant', width: 150 },
  { field: 'modele', headerName: 'Modèle', width: 125 },
  { field: 'numSerie', headerName: 'N° Série', width: 125 },
  { field: 'refClient', headerName: 'Référence', width: 125 },
  { field: 'precedentCE', headerName: 'Précédent CE', width: 125 },
  { field: 'ptsMesures', headerName: 'Points mesures', width: 200 },
  { field: 'typePrestation', headerName: 'Prestation', width: 175 },
  { field: 'emt', headerName: 'EMT', width: 150 },
  { field: 'periodicite', headerName: 'Périodicité', width: 100 },
  {
    field: 'dateSouhaitee',
    valueFormatter: (value?: Date) => {
      if (value === null || value === undefined) return ''
      else return value.toLocaleDateString()
    },
    headerName: 'Date',
    width: 100
  },
  { field: 'contact', headerName: 'Contact', width: 150 },
  { field: 'email', headerName: 'email', width: 150 },
  { field: 'telephone', headerName: 'Téléphone', width: 100 }
]

const CustomToolBar = ({ onSave }: CustomToolBarProps) => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarColumnsButton />
      <Button size="small" startIcon={<SaveIcon />} onClick={onSave}>
        enregistrer
      </Button>
    </GridToolbarContainer>
  )
}

const TableInstrument = ({ data, onSave }: TableProps) => {
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
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.numLigne}
          slots={{ toolbar: CustomToolBar }}
          slotProps={{
            toolbar: {
              onSave: onSave
            }
          }}
          density="compact"
          disableRowSelectionOnClick
        />
      </div>
    </div>
  )
}

export default TableInstrument
