import React from "react";
import "./central.scss";

function renderMessages({ message, userName }) {
  return (
    <div className="message_cont">
      <div className="message">{message.message}</div>
      <div className="sender">
        -{message.name} ({new Date(message.time).toLocaleTimeString()})
      </div>
      <div
        className={userName === message.name ? "triangle" : "triangle reverse"}
      ></div>
    </div>
  );
}

export default renderMessages;
