import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { User } from '@entity/*'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import os from 'os'
import { join } from 'path'
import { FindManyOptions } from 'typeorm'
import icon from '../../resources/icon.png?asset'
import userController from './database/controller/user'
import AppSource from './database/data-source'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    //mainWindow.webContents.send('sendUser', os.userInfo())
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC insert todo
  //ipcMain.on('insertTodo', () => todoMngr.insertTodo('test', 'encours'))

  AppSource.initialize()
    .then(() => {
      console.log('connection à la base de données initialisée')
      ipcMain.handle('user.logged', () => userController.findByName(os.userInfo().username))
      ipcMain.handle('user.all', (_event, filter?: FindManyOptions) =>
        userController.findAll(filter)
      )
      ipcMain.handle('user.find', (_event, id: number) => userController.findById(id))
      ipcMain.handle('user.update', (_event, user: User) => userController.update(user))
      ipcMain.handle('user.save', (_event, user: User) => userController.save(user))
    })
    .catch((err) => console.log(err))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.