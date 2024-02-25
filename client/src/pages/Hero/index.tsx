import "./hero.scss";

type Props = {};

export default function index({}: Props) {
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
              <input type="text" className="animated-input" />
            </div>
            <div className="input-container">
              <p>Room Name:</p>
              <input type="text" className="animated-input" />
            </div>
          </div>
          <button className="login-button">Enter Room</button>
        </div>
      </div>
    </>
  );
}
