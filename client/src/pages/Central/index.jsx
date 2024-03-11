import React, { useEffect, useState } from "react";
import "./central.scss";
import SearchIcon from "@mui/icons-material/Search";
import Participants from "../Participants";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import { toast } from "react-toastify";

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

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn === "false") {
      navigate("/");
    }

    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    newSocket.emit("joinRoom", { room });
    newSocket.on("joinRoom", (data) => {
      console.log(data);
    });

    newSocket.on("recieveMessage", (data) => {
      console.log(data);
      toast.success(data);
      return;
    });

    return () => {
      localStorage.setItem("loggedIn", "false");
      newSocket.disconnect();
    };
  }, [room]);

  const handleSendMessage = () => {
    socket.emit("sendMessage", { room, name, message });
    console.log("sent");
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
          <Participants name="participant1" />
          <Participants name="participant1" />
          <Participants name="participant1" />
          <Participants name="participant1" />
          <Participants name="participant1" />
        </div>

        <div className="second_cont">
          <div className="input-cont">
            <input
              type="text"
              placeholder="Enter Messages"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
