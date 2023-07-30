const express = require("express");
const app = express();
const cors = require("cors");
const authorize = require("./middlewares/jwtAuthentication");

const bodyParser = require("body-parser");
const usersRouter = require("./users/usersRoute");
const siteRouter = require("./sites/siteRoutes");
const settingRouter = require("./setting/settingRoutes");
const commentRouter = require("./comments/commentRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'))

app.use("/api-status", (req, res) => res.json({ status: "API is OK import" }));
app.use("/users", usersRouter);
app.use("/sites", siteRouter);
app.use("/setting", authorize, settingRouter);
app.use("/comment", authorize, commentRouter);

const port = process.env.PORT || 8000;

app.listen(port, function () {
  console.log("Server is running on port " + port);
});
