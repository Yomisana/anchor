/* eslint-disable no-undef */
require("./global");
const { app, BrowserWindow, ipcMain } = require("electron");
// const path = require('path')

function createWindow() {
  anchor_main = new BrowserWindow({
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
    anchor_main.loadFile("./build/index.html");
  } else {
    // 開發階段直接與 React 連線
    anchor_main.loadURL("http://localhost:3000/");
    // 開啟 DevTools.
    anchor_main.webContents.openDevTools();
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

ipcMain.on("toMain", async (event, arg) => {
  // console.log(`來自前端的: ${arg}`);
  // switch vs if which one here is better?
  switch (arg[0]) {
    case "python_version":
      console.log(`選擇的python版本: ${arg[1]}`);
      // TODO
      // 檢查是否有安裝選擇的python版本
      // 如果有，則可以直接顯示已安裝
      // 並且在端簡單檢查是否可以使用 python 與 pip
      // 如果沒有，則顯示未安裝
      // 如果之後有詢問功能，則可以詢問使用者是否要自動下載?
      event.reply("fromMain", ["python_status", `${arg[1]}`, false]);
      break;
    default:
      console.log(`來自前端的: ${arg}, 非法請求`);
  }
  // if (arg[0] === "python_version") {
  //   console.log(`選擇的python版本: ${arg[1]}`);
  // }
  // 適用於後端的處理，如果完畢後直接回傳
  // event.reply("fromMain", "This is a message from main, 收到");
});
