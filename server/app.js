const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8001;

app.get("*", (req, res) => {
  res.send({ ping: "pong" });
});

const start = async () => {
  app.listen(PORT, (req, res) => {
    console.log("Server listening on port: ", PORT);
  });
};

start();
