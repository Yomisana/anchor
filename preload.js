// not yet used
const { contextBridge, ipcRenderer } = require("electron");
// 要基於 後端的角度來看 send 與 receive.
contextBridge.exposeInMainWorld("api", {
  // 發送來自後端訊息到前端
  send: (channel, message) => {
    if (channel === "toMain") {
      // console.log(`received: ${message}`);
      ipcRenderer.send(channel, message);
    } else {
      console.log(`這不是好的channel: ${channel}, message: ${message}`);
    }
  },
  // 接收來自前端訊息到後端
  receive: (channel, func) => {
    if (channel === "fromMain") {
      // console.log("ready to send");
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    } else {
      console.log(`這不是好的channel: ${channel}`);
    }
  },
});
