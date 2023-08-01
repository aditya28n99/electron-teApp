const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`

document.getElementById('monitorButton').addEventListener('click', async () => {
    const { filePaths, canceled } = await window.ipcRenderer.showOpenDialog({
      properties: ['openDirectory'],
    });
  
    if (!canceled && filePaths.length > 0) {
      const selectedFolderPath = filePaths[0];
      window.ipcRenderer.startMonitoring(selectedFolderPath);
    }
  });