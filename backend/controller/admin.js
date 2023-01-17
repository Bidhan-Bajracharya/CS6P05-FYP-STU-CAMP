const Admin = require("../models/Admin");
const { StatusCodes } = require("http-status-codes");

const createAdmin = async (req, res) => {
  const admin = await Admin.create(req.body);
  const token = admin.createJWT();

  res.status(StatusCodes.CREATED).json({ admin, token });
};

const getAdmins = async(req, res) => {
  const admins = await Admin.find({}, "-password -refreshToken");
  res.status(StatusCodes.OK).json({ admins });
}

module.exports = { createAdmin, getAdmins };
