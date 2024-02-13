import { useState, useEffect } from "react";

const useTypewriter = (text) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    setDisplayText(""); // 清空顯示文字
    let i = -1;
    // 保持對 setInterval 的引用
    let typingInterval = null;

    // 定義打字效果的函數
    const typeEffect = () => {
      if (i < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval); // 清除計時器
      }
    };

    // 開始打字效果
    typingInterval = setInterval(typeEffect, 100);

    // 在下一次 useEffect 觸發前清除計時器
    return () => {
      clearInterval(typingInterval);
    };
  }, [text]);

  return displayText;
};

export const Typewriter = ({ text }) => {
  const displayText = useTypewriter(text);
  return displayText;
};
