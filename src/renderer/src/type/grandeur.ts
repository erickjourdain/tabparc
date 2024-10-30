import { Accreditation } from './accreditation'
import { Contact } from './contact'
import { FamilleInstrument } from './familleInstrument'
import { Lieu } from './lieu'

export interface Grandeur {
  id: number
  nom?: string
  accreditation?: Accreditation
  contacts?: Contact[]
  lieu?: Lieu
  instruments?: FamilleInstrument[]
}
