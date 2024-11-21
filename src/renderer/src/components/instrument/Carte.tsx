import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Instrument } from '@apptypes/index'

interface InstrumentCarteProps {
  instrument: Instrument
}

const InstrumentCarte = ({ instrument }: InstrumentCarteProps) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        sx={{ backgroundColor: 'primary.light', color: 'white' }}
        title={instrument.designation}
        subheader={`${instrument.fabricant} ${instrument.type}`}
      />
      <CardContent>
        <Typography variant="body2">
          {instrument.refClient} {instrument.numSerie} <br />
          {instrument.contact} {instrument.email} {instrument.telephone}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InstrumentCarte
