const getAllUsers = (req, res) => {
  res.send("all users");
};

const createUser = (req, res) => {
  res.send("user created");
};

const updateUser = (req, res) => {
  res.send("user updated");
};

const deleteUser = (req, res) => {
  res.send("user deleted");
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
