import { ElectronAPI } from '@electron-toolkit/preload'
import { FindManyOptions } from 'typeorm'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    electronAPI: {
      // User
      getLogged: () => Promise<User>
      getUsers: (filter: FindManyOptions<User>) => Promise<[User[], number]>
      searchUsers: (filter: FindManyOptions<User>, search: string) => Promise<[User[], number]>
      getUser: (id: number) => Promise<User>
      updateUser: (user: User) => Promise<User>
      createUser: (user: User) => Promise<User>
      // Contact
      getContacts: (filter: FindManyOptions<Contact>) => Promise<[Contact[], number]>
      searchContacts: (
        filter: FindManyOptions<Contact>,
        search: string
      ) => Promise<[Contact[], number]>
      getContact: (id: number) => Promise<Contact>
      updateContact: (contact: Contact) => Promise<Contact>
      createContact: (contact: Contact) => Promise<Contact>
    }
  }
}
