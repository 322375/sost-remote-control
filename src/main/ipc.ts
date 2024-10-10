import { desktopCapturer, ipcMain } from 'electron'
import { send as sendMainWindow } from './windows/main'
import { create as createControlWindow } from './windows/control'

export default function (): void {
  ipcMain.handle('login', async () => {
    console.log('start login...');
    return '1111'
  })
  ipcMain.on('control', async (_e, remoteCode) => {
    // todo 跟服务端交互
    sendMainWindow('control-state-change', remoteCode, 1);
    createControlWindow();
  })
  // 获取媒体设备信息
  ipcMain.handle('get-vedio-devices', async (_event, options) => {
    const sources = await desktopCapturer.getSources(options);
    return sources;
  })
}
