import { FindAndCount } from '@renderer/type'
import settings from '@renderer/utils/settings'
import { FindManyOptions } from 'typeorm'

interface Deps {
  page: number
  search: string
  route: string
}

const loadData = async ({ page, search, route }: Deps): Promise<FindAndCount<unknown>> => {
  const filter: FindManyOptions<unknown> = {
    skip: (page - 1) * settings.nbElements,
    take: settings.nbElements
  }
  let data
  if (search.length) {
    data = await window.electron.ipcRenderer.invoke(`${route}.search`, filter, search)
  } else {
    data = await window.electron.ipcRenderer.invoke(`${route}.all`, filter)
  }
  return { data: data[0], nbData: data[1] }
}

export default loadData
