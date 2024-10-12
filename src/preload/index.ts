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
      readUsers: (filtre: string | null, size: number | undefined) =>
        ipcRenderer.invoke('user.all', [filtre, size]),
      getLogged: () => ipcRenderer.invoke('user.logged'),
      getUsers: (filtre?: FindManyOptions<User>) => ipcRenderer.invoke('user.all', filtre),
      countUsers: (filtre?: FindManyOptions<User>) => ipcRenderer.invoke('user.count', filtre),
      onUserReceived: (callback) => {
        ipcRenderer.on('sendUser', (_event, value) => callback(value))
      }
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
