export interface DataInstrument {
  date: Date | null
  client: string | null
  contact: string | null
  email: string | null
  telephone: string | null
  delaiDemande: Date | null
  instruments: {
    designation: string | null
    fabricant: string | null
    type: string | null
    numSerie: string | null
    refClient: string | null
    grandeur: string | null
    idemCE: string | null
    pointsMesures: string | null
    prestation: string | null
    emt: string | null
    periodicite: string | null
    datePlanif: Date | null
    contact: string | null
    email: string | null
    telephone: string | null
  }[]
}
