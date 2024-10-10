import { useEffect, useState } from 'react'
import VideoControl from './pages/control/VideoControl'

function App(): JSX.Element {
  const [remoteCode, setRemoteCode] = useState('')
  const [localCode, setLocalCode] = useState('')
  const [controlText, setControlText] = useState('')

  const login = async function (): Promise<void> {
    const code = await window.electron.ipcRenderer.invoke('login')
    setLocalCode(code)
  }

  const handleControlChange = (e, name, type): void => {
    let text = ''
    if (type === 1) {
      text = `正在远程控制${name}`
    } else if (type === 2) {
      text = `正在被${name}远程控制`
    }
    setControlText(text)
  }

  const startControl = (remoteCode): void => {
    window.electron.ipcRenderer.send('control', remoteCode)
  }

  useEffect(() => {
    login()
    window.electron.ipcRenderer.on('control-state-change', handleControlChange)
    return (): void => {
      window.electron.ipcRenderer.removeListener('control-state-change', handleControlChange);
    }
  }, [])

  return (
    <>
      <VideoControl />
    </>
  )  
}
 
export default App

/*<div className="App">
        {controlText === '' ? (
          <>
            <div>你的控制码{localCode}</div>
            <input
              type="text"
              value={remoteCode}
              onChange={(e) => setRemoteCode(e.target.value)}
            ></input>
            <button onClick={() => startControl(remoteCode)}>开始控制</button>
          </>
        ) : (
          <div>{controlText}</div>
        )}
      </div> */