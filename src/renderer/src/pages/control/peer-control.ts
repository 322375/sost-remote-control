// src/eventBus.js
import mitt from 'mitt';

const peer = mitt();

async function getScreenStream() {
    try {
        const sources = await window.electron.ipcRenderer.invoke('get-vedio-devices', { types: ['window', 'screen'] });
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: sources[0].id,
                    maxWidth: window.screen.width,
                    maxHeight: window.screen.height,
                    minFrameRate: 30,
                    maxFrameRate: 30,
                },
            },
        });
        peer.emit('add-stream', stream);
    } catch (error) {
        console.error(error);
    }
}
export { peer, getScreenStream };