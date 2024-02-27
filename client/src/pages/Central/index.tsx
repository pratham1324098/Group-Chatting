import React from "react";
import "./central.scss";
import SearchIcon from '@mui/icons-material/Search';
import Participants from "../Participants";

type Props = {};

export default function Central({}: Props) {
  return (
    <div className="central">
      <div className="main_cont">
        <div className="first_cont">
          <div className="first_cont_1">
            <h3>ROOM ID: 23423422</h3>
          </div>
          <div className="first_cont_2" >
          <div className="center-input">
              <input type="text" placeholder="Search Group Member" />
          </div>
            <SearchIcon style={{color:"white"}} />
          </div>
          <div className="borderc"></div>
          <Participants name="lana" time="4:00" />
          <Participants name="mia" time="4:00" />
          <Participants name="Alexander" time="4:00" />
          <Participants name="marie" time="4:00" />
          <Participants name="Daniels" time="4:00" />
          </div>
    
        <div className="second_cont">
          <div className="message-input">
          <input type="text" placeholder="Enter Messages" />
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
