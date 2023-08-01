const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path');
const chokidar = require('chokidar');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }

  })

  win.loadFile('index.html');

  ipcMain.on('startMonitoring', (event, folderPath) => {
    if (!folderPath) {
      dialog.showErrorBox('Error', 'No folder selected!');
      return;
    }
  
    // Start monitoring the folder using chokidar
    const watcher = chokidar.watch(folderPath);
  
    // Event listeners for file changes
    watcher.on('add', (filePath) => {
      console.log(`File added: ${filePath}`);
    });
  
    watcher.on('change', (filePath) => {
      console.log(`File changed: ${filePath}`);
    });
  
    watcher.on('unlink', (filePath) => {
      console.log(`File removed: ${filePath}`);
    });
  
    // Event listener for errors
    watcher.on('error', (error) => {
      console.error('Watcher error:', error);
    });
  });
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})