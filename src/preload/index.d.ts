import { ElectronAPI } from '@electron-toolkit/preload'
import { User } from '@entity'
import { FindManyOptions } from 'typeorm'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    electronAPI: {
      getLogged: () => Promise<User[]>
      getUsers: (filtre?: FindManyOptions<User>) => Promise<User[]>
      countUsers: (filtre?: FindManyOptions<User>) => Promise<number>
      onUserReceived: (callback) => void
    }
  }
}
