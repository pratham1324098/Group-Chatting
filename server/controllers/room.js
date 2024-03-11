const Room = require("../models/room");

const getAllMembers = async (room) => {
  try {
    const members = await Room.findOne({ roomName: room });
    console.log("Got all members", members);
    return members.members;
  } catch (error) {
    console.log("Couldn't get users");
  }
};

const addUserToRoom = async (room, userName) => {
  try {
    const rooms = await Room.find({ roomName: room });
    if (rooms.length === 0) {
      await Room.create({ roomName: room, members: [userName] });
      console.log("Added user to room");
      return [userName];
    } else {
      const members = await Room.findOneAndUpdate(
        { roomName: room },
        { $push: { members: userName } },
        { new: true }
      );
      console.log("Added user to room");
      return members.members;
    }
  } catch (error) {
    console.log("Couldn't add users");
  }
};

const removeUserFromRoom = async (room, userName) => {
  console.log(room, userName);
  try {
    const members = await Room.findOneAndUpdate(
      { roomName: room },
      { $pull: { members: userName } },
      { new: true }
    );
    console.log("Removed user from room");
    return members;
  } catch (error) {
    console.log("Couldn't remove users");
  }
};

module.exports = { getAllMembers, addUserToRoom, removeUserFromRoom };
