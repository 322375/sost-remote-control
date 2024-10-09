import { shell, BrowserWindow } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset';
let win;
function create(): BrowserWindow {
  win = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  win.on('ready-to-show', () => {
    win.show()
  })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  win.loadFile(join(__dirname, 'pages/index.html'))
  return win
}

export { create }
