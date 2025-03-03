"use client";

import { useState } from "react";
import { HiExclamationCircle } from "react-icons/hi";
import { MdCancel } from "react-icons/md";

interface MessageBoxProps {
  type: "error" | "success";
  message: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleExit = () => {
    setIsVisible(false);
  };

  const styles = {
    container: {
      width: "100%",
      backgroundColor: type === "error" ? "rgba(236, 207, 207, 1)" : "rgba(13, 219, 50, 1)",
      borderRadius: "5px",
      padding: "6px",
      height: isVisible ? "auto" : "0px",
      opacity: isVisible ? "1" : "0",
      overflow: "hidden",
      transition: "height 0.5s ease-out, opacity 0.5s ease-out",
      display: isVisible ? "flex" : "none",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    icon: {
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container} role="alert">
      <p className={type === "error" ? `err-msg` : `succ-msg`}>{message}</p>
      {type === "error" ? (
        <MdCancel
          style={styles.icon}
          className="text-red-500 w-5 h-5"
          onClick={handleExit}
        />
      ) : (
        <HiExclamationCircle
          style={styles.icon}
          className="text-green-500 w-5 h-5"
          onClick={handleExit}
        />
      )}
    </div>
  );
};

export default MessageBox;
