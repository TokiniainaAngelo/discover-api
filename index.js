const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const authorize = require("./middlewares/jwtAuthentication");

const bodyParser = require("body-parser");
const usersRouter = require("./users/usersRoute");
const siteRouter = require("./sites/siteRoutes");
const settingRouter = require("./setting/settingRoutes");
const commentRouter = require("./comments/commentRoutes");
const notificationRouter = require("./notification/notificationRoutes");

const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

app.use("/api-status", (req, res) => res.json({ status: "API is OK import" }));
app.use("/users", usersRouter);
app.use("/sites", siteRouter);
app.use("/setting", settingRouter);
app.use("/notifications", notificationRouter);
app.use("/comment", commentRouter);

app.set("socketio", io);

const port = process.env.PORT || 8000;

io.on("connection", function (socket) {
  console.log("New User: " + socket.request.connection.remoteAddress);
  socket.on("message", function (msg) {
    console.log("Message: " + msg);
  });

  socket.on("disconnect", function () {
    console.log("User disconnected");
  });
});

server.listen(port, function () {
  console.log("Server is running on port " + port);
});

module.exports = { server, io };
