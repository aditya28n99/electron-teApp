const { app, BrowserWindow, Menu, Tray, ipcMain, dialog } = require('electron')
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html');

  /* Tray Icon Func.. */
  const iconPath = path.join(__dirname, "./Images/Icon.jpg");
  let tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Application', // This will be the label displayed when the user hovers over the tray icon
      click: () => {
        win.show();
      },
    },
    {
      label: 'Quit', // This option allows the user to quit the application
      click: () => {
        app.quit();
      },
    },
  ]);

  // Set the context menu for the system tray
  tray.setContextMenu(contextMenu);

  // Hide the main window when it's minimized, instead, show it in the system tray
  win.on('minimize', (event) => {
    event.preventDefault();
    win.hide();
  });
  // Show the main window when the user clicks on the tray icon
  tray.on('click', () => {
    win.show();
  });

  // The File configration starts -ipcMain -dialog
  ipcMain.handle('open-file-dialog', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
    });

    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths[0];
    }
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