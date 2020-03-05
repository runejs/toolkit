const { app, BrowserWindow } = require('electron');
const url = require("url");
const path = require('path');
const contextMenu = require('electron-context-menu');

let mainWindow;

// Add an item to the context menu that appears only when you click on an image
contextMenu({});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1500,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, `/dist/index.html`),
        protocol: "file:",
        slashes: true
    }));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if(mainWindow === null) {
        createWindow();
    }
});
