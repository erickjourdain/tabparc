import { Accreditation } from './accreditation'
import { Contact } from './contact'
import { Instrument } from './instrument'
import { Lieu } from './lieu'

export interface Grandeur {
  id: number
  nom?: string
  accreditation?: Accreditation
  contacts?: Contact[]
  lieu?: Lieu
  instruments?: Instrument[]
}
