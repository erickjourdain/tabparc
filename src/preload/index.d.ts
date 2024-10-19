import { ElectronAPI } from '@electron-toolkit/preload'
import { User } from '@entity'
import { FindManyOptions } from 'typeorm'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    electronAPI: {
      getLogged: () => Promise<User>
      getUsers: (filter: FindManyOptions<User>) => Promise<[User[], nbUsers]>
      searchUsers: (filter: FindManyOptions<User>, search: string) => Promise<[User[], nbUsers]>
      getUser: (id: number) => Promise<User>
      updateUser: (user: User) => Promise<User>
      createUser: (user: User) => Promise<User>
    }
  }
}
