import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("An user connected");

  socket.on("update-stock", (item) => {
    socket.broadcast.emit("stock-update", item);
  });

  socket.on("disconnect", () => {
    console.log("An user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});