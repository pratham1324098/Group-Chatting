import "./hero.scss";

type Props = {};

export default function index({}: Props) {
  return (
    <>
      <div className="container">
        <div className="con1">
          <h1 style={{ fontSize: "80px",color:"white" }}>Whisper of Wall...</h1>
          <div className="wall-content"> {/* Changed to use a div for positioning */}
            <p className="hidden-p" style={{bottom:"50%"}}>
              Feeling fragmented by endless chat apps? Group Whisper's brings your communities together. Discover groups for shared passions, effortlessly connect through voice, video, and text, and build lasting connections. Go beyond messaging, join the Group Whisper's revolution! ✨
            </p>
          </div>
        </div>
        <div className="con2">
          <h3 style={{ fontSize: "35px", marginBottom:"80px", textDecoration:"bold" }}>LOGIN TO ROOM</h3>
          <div className="login-form">
            <div className="input-container">
              {/* <span>Name :</span> */}
              <p style={{fontSize:"20px",marginLeft:"10px"}}>Name:
                </p>
              <input type="text" className="animated-input" />
            </div>
            <div className="input-container">
            <p style={{fontSize:"20px",marginLeft:"10px"}}>RoomID:
                </p>
              <input type="text" className="animated-input" />
            </div>
          </div>
          <button className="login-button">Enter Room</button>
        </div>
      </div>
    </>
  );
}
