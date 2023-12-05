import { Server } from "socket.io";

export default function handler(req, res) {
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("sendMessage", (obj) => {
      io.emit("Receive-Message", obj);
    });
  });

  console.log("Setting sockets");
  res.end(); // Move this line after setting up the WebSocket connection
}
