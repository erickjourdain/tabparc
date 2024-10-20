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

      // Lieu
      getLieux: (filter: FindManyOptions<Lieu>) => Promise<[Lieu[], number]>
      searchLieux: (filter: FindManyOptions<Lieu>, search: string) => Promise<[Lieu[], number]>
      getLieu: (id: number) => Promise<Lieu>
      updateLieu: (lieu: Lieu) => Promise<Lieu>
      createLieu: (lieu: Lieu) => Promise<Lieu>

      // Accreditation
      getAccreditations: (
        filter: FindManyOptions<Accreditation>
      ) => Promise<[Accreditation[], number]>
      searchAccreditations: (
        filter: FindManyOptions<Accreditation>,
        search: string
      ) => Promise<[Accreditation[], number]>
      getAccreditation: (id: number) => Promise<Accreditation>
      updateAccreditation: (lieu: Lieu) => Promise<Accreditation>
      createAccreditation: (lieu: Lieu) => Promise<Accreditation>
    }
  }
}
