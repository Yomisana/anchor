const { app, BrowserWindow } = require("electron");
// const path = require('path')

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: "Anchor",
    icon: "public/logo512.png",
    autoHideMenuBar: true,
    frame: true,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      devTools: !app.isPackaged,
      fullscreenBoolean: false,
      fullscreenableBoolean: false,
      simpleFullscreenBoolean: false,
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: __dirname + "/preload.js", // use a preload script
    },
  });

  if (app.isPackaged) {
    // Electron 正在生產環境中運行
    // 產品階段直接讀取 React 打包好的
    mainWindow.loadFile("./build/index.html");
  } else {
    // 開發階段直接與 React 連線
    mainWindow.loadURL("http://localhost:3000/");
    // 開啟 DevTools.
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
