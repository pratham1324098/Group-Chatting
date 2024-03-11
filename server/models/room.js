const mongoose = require("mongoose");

const roomModel = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
  },
});

const Room = mongoose.model("Room", roomModel);

module.exports = Room;
