import { electronAPI } from '@electron-toolkit/preload'
import { Accreditation, Contact, Instrument, Lieu, User } from '@entity/*'
import { contextBridge, ipcRenderer } from 'electron'
import { FindManyOptions } from 'typeorm'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electronAPI', {
      // User repository
      getLogged: () => ipcRenderer.invoke('user.logged'),
      getUsers: (filter: FindManyOptions<User>) => ipcRenderer.invoke('user.all', filter),
      searchUsers: (filter: FindManyOptions<User>, search: string) =>
        ipcRenderer.invoke('user.search', filter, search),
      getUser: (id: string) => ipcRenderer.invoke('user.find', id),
      updateUser: (user: User) => ipcRenderer.invoke('user.update', user),
      createUser: (user: User) => ipcRenderer.invoke('user.save', user),

      // Contact repository
      getContacts: (filter: FindManyOptions<Contact>) => ipcRenderer.invoke('contact.all', filter),
      searchContacts: (filter: FindManyOptions<Contact>, search: string) =>
        ipcRenderer.invoke('contact.search', filter, search),
      getContact: (id: string) => ipcRenderer.invoke('contact.find', id),
      updateContact: (contact: Contact) => ipcRenderer.invoke('contact.update', contact),
      createContact: (contact: Contact) => ipcRenderer.invoke('contact.save', contact),

      // Lieu repository
      getLieux: (filter: FindManyOptions<Lieu>) => ipcRenderer.invoke('lieu.all', filter),
      searchLieux: (filter: FindManyOptions<Lieu>, search: string) =>
        ipcRenderer.invoke('lieu.search', filter, search),
      getLieu: (id: string) => ipcRenderer.invoke('lieu.find', id),
      updateLieu: (lieu: Lieu) => ipcRenderer.invoke('lieu.update', lieu),
      createLieu: (lieu: Lieu) => ipcRenderer.invoke('lieu.save', lieu),

      // Accreditation repository
      getAccreditations: (filter: FindManyOptions<Accreditation>) =>
        ipcRenderer.invoke('accreditation.all', filter),
      searchAccreditations: (filter: FindManyOptions<Accreditation>, search: string) =>
        ipcRenderer.invoke('accreditation.search', filter, search),
      getAccreditation: (id: string) => ipcRenderer.invoke('accreditation.find', id),
      updateAccreditation: (accreditation: Accreditation) =>
        ipcRenderer.invoke('accreditation.update', accreditation),
      createAccreditation: (accreditation: Accreditation) =>
        ipcRenderer.invoke('accreditation.save', accreditation),

      // Instrument repository
      getInstruments: (filter: FindManyOptions<Instrument>) =>
        ipcRenderer.invoke('instrument.all', filter),
      searchInstruments: (filter: FindManyOptions<Instrument>, search: string) =>
        ipcRenderer.invoke('instrument.search', filter, search),
      getInstrument: (id: string) => ipcRenderer.invoke('instrument.find', id),
      updateInstrument: (instrument: Instrument) =>
        ipcRenderer.invoke('instrument.update', instrument),
      createInstrument: (instrument: Instrument) =>
        ipcRenderer.invoke('instrument.save', instrument)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
