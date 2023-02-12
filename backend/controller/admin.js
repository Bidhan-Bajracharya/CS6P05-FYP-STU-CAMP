const Admin = require("../models/Admin");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require('path');

const createAdmin = async (req, res) => {
  const admin = await Admin.create(req.body);
  const token = admin.createRefreshToken();

  res.status(StatusCodes.CREATED).json({ admin, token });
};

const getAdmins = async(req, res) => {
  const admins = await Admin.find({}, "-password -refreshToken");
  res.status(StatusCodes.OK).json({ admins });
}

const resetAdminPassword = async (req, res) => {
  const newPassword = req.body.newPassword;
  const adminId = req.user.userId;

  const admin = await Admin.findOne({ _id: adminId });

  // checking if admin exists
  if (!admin) {
    throw new BadRequestError(`Admin with id: ${adminId} was not found.`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  const isPasswordSame = await admin.comparePassword(newPassword);

  // checking if the new password matches old one
  if (isPasswordSame) {
    throw new BadRequestError(
      `New password cannot be same as the old password.`
    );
  }

  // passing the newly hashed password
  const updatedAdmin = await Admin.findOneAndUpdate(
    { _id: adminId },
    { password: hashedNewPassword },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ updatedAdmin });
};

const changeProfilePicture = async (req, res) => {
  const { userId } = req.user;
  const { picture } = req.body;

  if (!picture) {
    throw new BadRequestError("No picture was provided.");
  }

  // check if admin had profile pic
  const adminInfo = await Admin.findOne({_id: userId}, "-_id profile_pic")
  
  // delete previous picture if exists
  if(adminInfo.profile_pic !== "default"){
    console.log("process ran");
    fs.unlink(path.resolve(__dirname, "../", "public/images") + `/${adminInfo.profile_pic}`, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  const user = await Admin.findOneAndUpdate(
    { _id: userId },
    { profile_pic: picture },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ user });
};

module.exports = { createAdmin, getAdmins, resetAdminPassword, changeProfilePicture };
