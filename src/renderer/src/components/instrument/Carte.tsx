import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Instrumnent } from '@preload/types'

interface InstrumentCarteProps {
  instrument: Instrumnent
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
          {instrument.grandeur} <br />
          {instrument.pointsMesures} <br />
          {instrument.periodicite} {instrument.idemCE} <br />
          {instrument.prestation} <br />
          {instrument.prestation !== 'Etalonnage' && (
            <>
              emt: {instrument.emt} <br />
            </>
          )}
          {instrument.contact} {instrument.email} {instrument.telephone}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InstrumentCarte
