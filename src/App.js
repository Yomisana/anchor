import React, { useState, useEffect } from "react";

export default function App() {
  const [subtitle_text, setSubtitle_text] = useState("Anchor");
  const [prevIndex, setPrevIndex] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const text_array = [
        "your project",
        "stable diffusion webui",
        "switch python version",
        "manger python",
      ];

      let index = Math.floor(Math.random() * text_array.length);

      // 如果新的索引與前一次相同，就找到一個不同的索引
      while (index === prevIndex) {
        index = Math.floor(Math.random() * text_array.length);
      }
      // add timestamp
      console.log(`subtitle tick active: ${new Date().toLocaleTimeString()}`);
      // console.log(`now subtitle: ${text_array[index]}, num: ${index}`);
      setSubtitle_text(text_array[index]);
      setPrevIndex(index);
    }, 1000);

    return () => clearInterval(intervalId); // 清除定時器
  }, [prevIndex]); // 當 prevIndex 改變時重新執行

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
        Easy using portable python for {subtitle_text}.
      </div>
      {/* h2 or span status about select python installed or not install */}
      <h2 style={styles.status}>Status: ✅ Installed | ❌ Not Installed</h2>
      {/* Choose python version */}
      <select style={styles.select}>
        <option value="3.8">Python 3.8</option>
        <option value="3.9">Python 3.9</option>
      </select>
      {/* Open default Terminal app (set path about select installed portable python) */}
      <div style={{ flexDirection: "row", alignSelf: "center" }}>
        <button style={styles.button}>Open Terminal</button>
        <button style={styles.button}>Download</button>
      </div>
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
};
