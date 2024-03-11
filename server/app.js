const express = require("express");
const http = require("http");
const socket = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Client connected with ID: ${socket.id}`);

  // Joining a room
  socket.on("joinRoom", (data) => {
    socket.join(data.room);
    io.to(data.room).emit("joinRoom", {
      username: data.username,
      room: data.room,
    });
    console.log(`Client ${socket.id} joined room ${data.room}`);
  });

  // Handling messages within a room
  socket.on("sendMessage", (data) => {
    // Broadcasting to all clients in the same room
    console.log("New Message, ", data);
    io.to(data.roomName).emit("recieveMessage", data.message);
  });

  // Leaving a room
  socket.on("leaveRoom", (roomName) => {
    socket.leave(roomName);
    console.log(`Client ${socket.id} left room ${roomName}`);
  });

  // Clean up on disconnect
  socket.on("disconnect", () => {
    console.log(`Client disconnected with ID: ${socket.id}`);
  });
});

server.listen(8000, () => {
  console.log("Socket is running on port 8000");
});

app.listen(8001, () => {
  console.log("Server running on port 8001");
});
