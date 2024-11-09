import { Instrument } from '@entity/*'
import AppDataSource from '../data-source'
import { loggedUser } from './login'

const instrumentRepository = AppDataSource.getRepository(Instrument)

const save = async (instrument: Instrument) => {
  return new Promise((resolve, reject) => {
    try {
      if (loggedUser?.role !== 'ADMIN' && loggedUser?.role !== 'COMMERCIAL')
        throw new Error('vous ne disposeez pas des droits pour réaliser cette opération', {
          cause: 'operation denied'
        })
      return resolve(instrumentRepository.save(instrument))
    } catch (error) {
      return reject(error)
    }
  })
}

export default { save }
