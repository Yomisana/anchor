import { useState, useEffect } from "react";

const useTypewriter = (text) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true); // 控制游標可見性

  useEffect(() => {
    setDisplayText(""); // 清空顯示文字
    let i = -1;
    // 保持對 setInterval 的引用
    let typingInterval = null;
    let cursorInterval = null;

    // 定義打字效果的函數
    const typeEffect = () => {
      if (i < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval); // 清除計時器
      }
    };

    // 定義游標閃爍效果的函數
    const cursorEffect = () => {
      setShowCursor((prevShowCursor) => !prevShowCursor);
    };

    // 開始打字效果
    typingInterval = setInterval(typeEffect, 100);

    // 開始游標閃爍效果
    cursorInterval = setInterval(cursorEffect, 500); // 每隔500毫秒切換一次游標可見性

    // 在下一次 useEffect 觸發前清除計時器
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [text]);

  // 返回包含文字和游標的元素
  return (
    <span>
      {displayText} {showCursor && <span>_</span>}
    </span>
  );
};

export const Typewriter = ({ text }) => {
  const displayText = useTypewriter(text);
  return displayText;
};
