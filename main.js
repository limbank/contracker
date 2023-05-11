const { app, BrowserWindow, ipcMain, dialog, screen, globalShortcut } = require("electron");

const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const Lumberjack = require('./scripts/main/lumberjack.js');
const settingsProcessor = require('./scripts/main/settingsProcessor.js');
const windowManager = require('./scripts/main/windowManager.js');

const { name } = require('./package.json');

let mainWindow, newWin;
let sp, rp, wm, fp, ie, hp;
let processorsReady = false;

let gotTheLock;
let wmReady = false;

const homeDir = path.join(os.homedir(), '.' + name);

const jack = new Lumberjack();

sp = new settingsProcessor({
    home:homeDir,
    filename: 'config.json',
    ready: () => {
        wm = new windowManager({
            rp: rp,
            sp: sp,
            ready: () => {
                wmReady = true;
            }
        });
    }
});

try {
    require("electron-reloader")(module);
} catch (_) {}

gotTheLock = app.requestSingleInstanceLock();

function createWhenReady() {
    if (!wmReady) setTimeout(createWhenReady, 100);
    else wm.createWindow();
}

if (!gotTheLock) app.quit();
else app.on("ready", createWhenReady);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
    if (wm.windows.length <= 0) createWhenReady();
});

ipcMain.on('settings:write', (event, arg) => {
    sp.writeSettings(arg, () => {
        event.sender.send('settings', sp.settings);
    });
});

ipcMain.on('window', (event, arg) => {
    let senderID = event.sender.id;
    let activeWindow = wm.getWindowByID(senderID);

    if (!activeWindow) return;
    switch (arg) {
        case "pin":
            if (activeWindow.isAlwaysOnTop()) activeWindow.setAlwaysOnTop(false);
            else activeWindow.setAlwaysOnTop(true);
            event.sender.send('pin', activeWindow.isAlwaysOnTop());
            break;
        case "close":
            activeWindow.close();
            break;
        case "maximize":
            if (activeWindow.isMaximized()) activeWindow.unmaximize();
            else activeWindow.maximize();
            event.sender.send('max', activeWindow.isMaximized());
            break;
        case "minimize":
            activeWindow.minimize();
            break;
        case "new":
            wm.createWindow();
            break;
        case "clickthrough":
            activeWindow.setIgnoreMouseEvents(true);
            activeWindow.setFocusable(false);

            event.sender.send('action', "Enabled click-through mode!");
            event.sender.send('action', "Use CTRL or CMD + M to exit");

            lastActiveWindows.push(activeWindow);
        default: break;
    }
});

ipcMain.on('action', (event, arg) => {
    event.sender.send('action', arg);
});

ipcMain.on('loading', (event, arg) => {
    event.sender.send('loading', arg);
});

ipcMain.on('select:getFile', (event, arg) => {
    let senderID = event.sender.id;
    let activeWindow = wm.getWindowByID(senderID);
    
    if (!activeWindow) return;
    dialog.showOpenDialog(activeWindow, {
        title: "Select file",
        properties: ['openFile']
    }).then(result => {
        if (!result.cancelled && result.filePaths.length > 0) {
            let files = result.filePaths;

            event.sender.send('getFile', files[0]);
            event.sender.send('action', "Selected a file");
        }
    }).catch(err => {
        jack.log("Error selecting file: ", err);
    });
});