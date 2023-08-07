const usersService = require("./usersService");
const jwt = require("jsonwebtoken");

const addUser = async function (req, res, next) {
  try {
    const { _id, ...user } = req.body;
    await usersService.addUser(user);
    let jwtToken = jwt.sign({ email: user.email, fullname: user.fullname }, "jwt-secret-key", { expiresIn: "50d" });
    res.json({ token: jwtToken, userId: user._id });
  } catch (err) {
    res.json(err);
  }
};

const getAllUsers = async function (req, res, next) {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.json(err);
  }
};

const getUserById = async function (req, res, next) {
  try {
    const user = await usersService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};

const getUserByLoginAndPassword = async function (req, res, next) {
  try {
    const user = await usersService.getUserByLoginAndPassword(req.body);
    if (user) {
      let jwtToken = jwt.sign({ email: user.email, fullname: user.fullname }, "jwt-secret-key", { expiresIn: "50d" });
      res.json({ token: jwtToken, userId: user._id });
    } else {
      res.json(null);
    }
  } catch (err) {
    res.json(err);
  }
};

const updateUser = async function (req, res, next) {
  try {
    const user = await usersService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.json(err.message);
  }
};

const deleteUser = async function (req, res, next) {
  try {
    const user = await usersService.deleteUser(req.params.id);
    res.json(user);
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  getUserByLoginAndPassword,
  updateUser,
  deleteUser,
};
