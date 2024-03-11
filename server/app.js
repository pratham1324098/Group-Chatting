const express = require("express");
const http = require("http");
const socket = require("socket.io");
const dotenv = require("dotenv");
const connectDB = require("./connectDB/connect");
const {
  addUserToRoom,
  removeUserFromRoom,
  getAllMembers,
} = require("./controllers/room");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Client connected with ID: ${socket.id}`);

  socket.on("checkIfNoUser", async (data) => {
    const allMembers = await getAllMembers(data.room);
    console.log({ allMembers });
    if (allMembers !== undefined && allMembers.includes(data.name)) {
      socket.emit("existingUser");
      return;
    }
    socket.emit("success");
  });

  // Joining a room
  socket.on("joinRoom", async (data) => {
    socket.join(data.room);
    const members = await addUserToRoom(data.room, data.name);
    io.to(data.room).emit("joinRoom", {
      username: data.name,
      room: data.room,
      users: members,
    });
    console.log(`Client ${socket.id} joined room ${data.room}`);
  });

  // Handling messages within a room
  socket.on("sendMessage", (data) => {
    // Broadcasting to all clients in the same room
    console.log("New Message, ", data);
    io.to(data.room).emit("recieveMessage", { ...data, time: Date.now() });
  });

  // Leaving a room
  socket.on("leaveRoom", async (data) => {
    const members = await removeUserFromRoom(data.room, data.name);
    io.to(data.room).emit("joinRoom", {
      username: data.name,
      room: data.room,
      users: members.members,
    });
    socket.leave(data.room);
    console.log(`Client ${socket.id} left room ${data.room}`);
  });

  // Clean up on disconnect
  // socket.on("disconnect", async (data) => {
  //   console.log(`Client disconnected with ID: ${socket.id}`);
  // });
});

server.listen(8000, () => {
  console.log("Socket is running on port 8000");
});

app.listen(8001, async () => {
  await connectDB(process.env.MONGO_URI);
  console.log("Server running on port 8001");
});
