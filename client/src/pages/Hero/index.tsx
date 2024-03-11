import { Link, useNavigate } from "react-router-dom";
import "./hero.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {}

export default function Hero({}: Props) {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const navigate = useNavigate();
  const handleJoinRoom = () => {
    if (name.length < 2 || room.length < 2) {
      toast.error("Something went wrong");
      return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("room", room);
    localStorage.setItem("name", name);
    navigate(`/central/${room}`);
  };

  return (
    <>
      <div className="container">
        <div className="con1">
          <h1>LinkUp</h1>
          <div className="wall-content">
            <div>
              <p>
                Feeling fragmented by endless chat apps? Group Whisper's brings
                your communities together. Discover groups for shared passions,
                effortlessly connect through voice, video, and text, and build
                lasting connections. Go beyond messaging, join the Group
                Whisper's revolution! ✨
              </p>
            </div>
          </div>
        </div>
        <div className="con2">
          <h3>JOIN A ROOM</h3>
          <div className="login-form">
            <div className="input-container">
              <p>Name:</p>
              <input
                type="text"
                className="animated-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <p>Room Name:</p>
              <input
                type="text"
                className="animated-input"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
          </div>
          <button className="login-button" onClick={handleJoinRoom}>
            Enter Room
          </button>
        </div>
      </div>
    </>
  );
}
