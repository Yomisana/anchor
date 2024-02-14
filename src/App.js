import React, { useState, useEffect } from "react";
import { Typewriter } from "./lib/Typewriter";

export default function App() {
  const [subtitle_text, setSubtitle_text] = useState("Anchor");
  const [prevIndex, setPrevIndex] = useState(null);

  // select python version
  const [selectedpyVersion, setSelectedpyVersion] = useState("3.10.11");

  const handleVersionChange = (event) => {
    // console.log(`使用者變更選擇: ${event.target.value}`);
    setSelectedpyVersion(event.target.value);
  };

  useEffect(() => {
    console.log(`當前python選擇版本: ${selectedpyVersion}`);
  }, [selectedpyVersion]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const text_array = [
        "your project",
        "stable diffusion webui",
        "switch python version",
        "manger python",
        "debugger",
        "🌕",
      ];

      let index = Math.floor(Math.random() * text_array.length);

      // 如果新的索引與前一次相同，就找到一個不同的索引
      while (index === prevIndex) {
        index = Math.floor(Math.random() * text_array.length);
      }
      // add timestamp
      // console.log(`subtitle tick active: ${new Date().toLocaleTimeString()}`);
      // console.log(`now subtitle: ${text_array[index]}, num: ${index}`);
      setSubtitle_text(text_array[index]);
      setPrevIndex(index);
    }, 5000);

    return () => clearInterval(intervalId); // 清除定時器
  }, [prevIndex]); // 當 prevIndex 改變時重新執行

  const openTerminal = () => {
    console.log("open terminal");
    // 在這裡可以訪問 selectedVersion
  };

  const download = () => {
    console.log(`download python portable version: ${selectedpyVersion}`);
  };

  return (
    <div style={styles.container}>
      {/* Title */}
      <h1 style={styles.title}>Anchor</h1>
      {/* span easy using protable python some description */}
      <div
        style={{
          ...styles.subtitle,
          wordWrap: "break-word",
        }}
      >
        Easy using portable python for <Typewriter text={subtitle_text} />
      </div>
      {/* h2 or span status about select python installed or not install */}
      {/* ✅ Installed | ❌ Not Installed */}
      <h2 style={styles.status}>Status: ❌ Not Installed</h2>
      {/* Choose python version */}
      {/* https://www.python.org/ftp/python/3.10.11/python-3.10.11-embed-amd64.zip */}
      <select
        style={styles.select}
        defaultValue={selectedpyVersion}
        onChange={handleVersionChange}
      >
        <option value="3.10.6">Python 3.10.6</option>
        <option value="3.10.7">Python 3.10.7</option>
        <option value="3.10.8">Python 3.10.8</option>
        <option value="3.10.9">Python 3.10.9</option>
        <option value="3.10.10">Python 3.10.10</option>
        <option value="3.10.11">Python 3.10.11</option>
      </select>
      {/* Open default Terminal app (set path about select installed portable python) */}
      <div style={{ flexDirection: "row", alignSelf: "center" }}>
        <button style={styles.button} onClick={openTerminal}>
          Open Terminal
        </button>
        <button style={styles.button} onClick={download}>
          Download
        </button>
      </div>
      {/* Download progress */}
      <div
        style={{ flexDirection: "column", alignSelf: "center", width: "80%" }}
      >
        {/* Preparing... | Downloading... | Installing... | Finished! | Error! | Failed... */}
        <h2 style={styles.progress_status}>Preparing...</h2>

        <progress value="20" max="100" style={styles.progress}></progress>
      </div>
      {/* Setting */}
      {/* Language */}
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#36393f", // Discord 暗黑模式下的黑色背景色
    width: "100vw",
    height: "100vh",
    display: "flex",
  },
  title: {
    color: "white",
    fontSize: "4rem",
    textAlign: "center",
    margin: "20px",
  },
  subtitle: {
    color: "white",
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "20px",
    flexDirection: "row",
  },
  status: {
    color: "white",
    fontSize: "2rem",
    textAlign: "center",
    margin: "20px",
  },
  select: {
    width: "80%",
    padding: "10px",
    fontSize: "1rem",
    alignSelf: "center",
    margin: "20px",
    borderRadius: "50px",
  },
  button: {
    width: "100",
    padding: "10px",
    fontSize: "1rem",
    alignSelf: "center",
    borderRadius: "50px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  progress_status: {
    fontSize: "1.2rem",
    color: "white",
  },
  progress: {
    width: "100%",
    padding: "10px",
  },
};
