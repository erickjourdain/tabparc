import { DemandeClient } from '@apptypes/index'
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { useState } from 'react'

interface TableProps {
  data: DemandeClient
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: '0.75rem'
}))

const TableInstrument = ({ data }: TableProps) => {
  const rowsPerPage = 5
  const [page, setPage] = useState(0)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 800, p: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 70 }}>ID</TableCell>
              <TableCell style={{ width: 150 }}>Désignation2</TableCell>
              <TableCell style={{ width: 100 }}>Fabricant/Marque</TableCell>
              <TableCell style={{ width: 75 }}>Modèle</TableCell>
              <TableCell style={{ width: 50 }}>N° Série</TableCell>
              <TableCell style={{ width: 75 }}>Ref. Interne</TableCell>
              <TableCell style={{ width: 100 }}>Grandeur/Domaine</TableCell>
              <TableCell style={{ width: 75 }}>CE précédent</TableCell>
              <TableCell style={{ width: 120 }}>Pts mesures</TableCell>
              <TableCell style={{ width: 100 }}>Type</TableCell>
              <TableCell style={{ width: 50 }}>EMT</TableCell>
              <TableCell style={{ width: 50 }}>Périodicité</TableCell>
              <TableCell style={{ width: 30 }}>Date souhaitée</TableCell>
              <TableCell style={{ width: 50 }}>Contact</TableCell>
              <TableCell style={{ width: 50 }}>Email</TableCell>
              <TableCell style={{ width: 50 }}>Téléphone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.instruments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((instrument, ind) => (
                <StyledTableRow key={ind}>
                  <StyledTableCell>{ind + page * rowsPerPage + 1}</StyledTableCell>
                  <StyledTableCell>{instrument.designation}</StyledTableCell>
                  <StyledTableCell>{instrument.fabricant}</StyledTableCell>
                  <StyledTableCell>{instrument.modele}</StyledTableCell>
                  <StyledTableCell>{instrument.numSerie}</StyledTableCell>
                  <StyledTableCell>{instrument.refClient}</StyledTableCell>
                  <StyledTableCell>{instrument.grandeur}</StyledTableCell>
                  <StyledTableCell>{instrument.precedentCE}</StyledTableCell>
                  <StyledTableCell>{instrument.ptsMesures}</StyledTableCell>
                  <StyledTableCell>{instrument.typePrestation}</StyledTableCell>
                  <StyledTableCell>{instrument.emt}</StyledTableCell>
                  <StyledTableCell>{instrument.periodicite}</StyledTableCell>
                  <StyledTableCell>
                    {instrument.dateSouhaitee?.toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell>{instrument.contact}</StyledTableCell>
                  <StyledTableCell>{instrument.email}</StyledTableCell>
                  <StyledTableCell>{instrument.telephone}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={data.instruments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  )
}

export default TableInstrument
