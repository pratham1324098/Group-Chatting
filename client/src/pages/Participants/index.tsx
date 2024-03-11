import React, { useState, useEffect } from "react";
import "./Participants.scss";

interface ParticipantProps {
  name: string;
}

const Participant: React.FC<ParticipantProps> = ({ name }) => {
  return (
    <>
      <div className="participant">
        <label className="avatar-label">
          {<img src="/favicon.ico" alt={name} className="avatar" />}
          {<div className="avatar-placeholder"></div>}
        </label>
        <div className="info">
          <h3 className="name">{name}</h3>
        </div>
      </div>
    </>
  );
};

export default Participant;
