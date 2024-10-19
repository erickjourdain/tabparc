import { electronAPI } from '@electron-toolkit/preload'
import { Contact, User } from '@entity/*'
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
      createContact: (contact: Contact) => ipcRenderer.invoke('contact.save', contact)
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
