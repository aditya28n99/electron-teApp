const { contextBridge, ipcRenderer } = require('electron');

// Expose 'require' to the renderer process
contextBridge.exposeInMainWorld('require', require);
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
