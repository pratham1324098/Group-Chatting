import React, { useEffect, useState } from "react";
import "./central.scss";
import SearchIcon from "@mui/icons-material/Search";
import Participants from "../Participants";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import { toast } from "react-toastify";
import renderMessages from "./renderMessages";

export default function Central() {
  const [message, setMessage] = useState("");
  const { roomName } = useParams();
  const [room, _setRoom] = useState(() => {
    return localStorage.getItem("room");
  });
  const [name, _setname] = useState(() => {
    return localStorage.getItem("name");
  });
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn === "false") {
      navigate("/");
    }

    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    newSocket.emit("checkIfNoUser", { room, name });

    newSocket.on("success", () => {
      newSocket.emit("joinRoom", { room, name });
    });

    newSocket.on("existingUser", () => {
      toast.info("A user already exists with that username");
      window.location.href = "/";
    });

    newSocket.on("joinRoom", (data) => {
      console.log(data);
      setMembers(data.users);
    });

    newSocket.on("recieveMessage", (data) => {
      setMessages((prev) => {
        return [...prev, data];
      });
      return;
    });

    return () => {
      localStorage.setItem("loggedIn", "false");
    };
  }, [room]);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      socket.emit("leaveRoom", { room, name });
    });
    return () => {
      window.removeEventListener("beforeunload");
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim().length < 1) return null;
    socket.emit("sendMessage", { room, name, message });
    setMessage("");
  };

  return (
    <div className="central">
      <div className="main_cont">
        <div className="first_cont">
          <div className="first_cont_1">
            <h3>ROOM: {roomName}</h3>
          </div>
          <div className="first_cont_2">
            <div className="center-input">
              <input type="text" placeholder="Search Group Member" />
            </div>
            <SearchIcon style={{ color: "white" }} />
          </div>
          {members?.map((member, index) => {
            return (
              <div key={index}>
                <Participants name={member} />
              </div>
            );
          })}
        </div>

        <div className="second_cont">
          {messages.map((message, index) => {
            return (
              <div key={index}>
                {renderMessages({ message, userName: name })}
              </div>
            );
          })}
          <div className="input-cont">
            <input
              type="text"
              placeholder="Enter Messages"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Go" || e.key === "Return") {
                  handleSendMessage();
                }
              }}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
      <button
        className="leave"
        onClick={() => {
          socket.emit("leaveRoom", { room, name });
          window.location.href = "/";
        }}
      >
        Leave
      </button>
    </div>
  );
}
