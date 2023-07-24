const usersService = require("./usersService");
const jwt = require("jsonwebtoken");

const addUser = async function (req, res, next) {
  try {
    const { _id, ...user } = req.body;
    await usersService.addUser(user);
    res.json({ data: user, message: "Ressource created" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getAllUsers = async function (req, res, next) {
  try {
    const users = await usersService.getAllUsers();
    res.json({ data: users, message: "Ressources found" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getUserById = async function (req, res, next) {
  try {
    const user = await usersService.getUserById(req.params.id);
    res.json({ data: user, message: "Ressource found" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getUserByLoginAndPassword = async function (req, res, next) {
  try {
    const user = await usersService.getUserByLoginAndPassword(req.body);
    if (user) {
      let jwtToken = jwt.sign({ email: user.email, userId: user._id }, "jwt-secret-key", { expiresIn: "1h" });

      res.json({ data: { token: jwtToken, _id: user._id, role: user.role }, message: "Ressource found" });
    } else {
      res.json({ data: user, message: "Invalid login/password" });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};

const updateUser = async function (req, res, next) {
  try {
    const user = await usersService.updateUser(req.params.id, req.body);
    res.json({ data: user, message: "Ressource updated" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteUser = async function (req, res, next) {
  try {
    const user = await usersService.deleteUser(req.params.id);
    res.json({ data: user, message: "Ressource deleted" });
  } catch (err) {
    res.json({ error: err.message });
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
