import React, { useState, useEffect } from "react";
import "./Participants.scss";

interface ParticipantProps {
  name: string;
}

const Participant: React.FC<ParticipantProps> = ({ name }) => {
  const localStorageKey = `avatar_${name}`; // Unique key for each participant
  const [avatar, setAvatar] = useState<string | null>(() => {
    // Retrieve avatar from local storage on component mount
    const storedAvatar = localStorage.getItem(localStorageKey);
    return storedAvatar ? storedAvatar : null;
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        // Store avatar in local storage with unique key
        localStorage.setItem(localStorageKey, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Clean up local storage if avatar is removed
    return () => localStorage.removeItem(localStorageKey);
  }, [localStorageKey]);

  return (
    <>
      <div className="participant">
        <label className="avatar-label">
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="avatar-input"
          />
          {avatar && <img src={avatar} alt={name} className="avatar" />}
          {!avatar && <div className="avatar-placeholder"></div>}
        </label>
        <div className="info">
          <h3 className="name">{name}</h3>
          <p style={{ fontSize: "12px", marginTop: "0.2rem" }}>subtext</p>
        </div>
      </div>
    </>
  );
};

export default Participant;
