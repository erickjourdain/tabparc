import { electronAPI } from '@electron-toolkit/preload'
import { User } from '@entity/*'
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
      getLogged: () => ipcRenderer.invoke('user.logged'),
      getUsers: (filter: FindManyOptions<User>) => ipcRenderer.invoke('user.all', filter),
      getUser: (id: string) => ipcRenderer.invoke('user.find', id),
      updateUser: (user: User) => ipcRenderer.invoke('user.update', user),
      createUser: (user: User) => ipcRenderer.invoke('user.save', user)
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
