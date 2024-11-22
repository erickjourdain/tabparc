import { FindAndCount } from '@renderer/type'
import ipcRendererService from '@renderer/utils/ipcRendererService'
import settings from '@renderer/utils/settings'
import { FindManyOptions } from 'typeorm'

interface Deps {
  page: number
  search: string
  route: string
  relations?: string[]
}

const loadData = async ({
  page,
  search,
  route,
  relations
}: Deps): Promise<FindAndCount<unknown>> => {
  return new Promise((resolve, reject) => {
    const filter: FindManyOptions<unknown> = {
      skip: (page - 1) * settings.nbElements,
      take: settings.nbElements
    }
    if (relations === undefined) relations = []
    filter.relations = relations
    if (search.length) {
      ipcRendererService
        .invoke(`${route}.search`, filter, search)
        .then((data) => resolve({ data: data[0], nbData: data[1] }))
        .catch((error) => reject(error))
    } else {
      ipcRendererService
        .invoke(`${route}.all`, filter)
        .then((data) => resolve({ data: data[0], nbData: data[1] }))
        .catch((error) => reject(error))
    }
  })
}

export default loadData
