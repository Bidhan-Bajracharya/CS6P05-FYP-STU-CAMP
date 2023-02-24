const User = require("../models/User");
const Admin = require("../models/Admin");
const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { ADMIN } = require("../permission/role");

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  let user = {};

  // find if user exists or not
  if (email.includes("admin")) {
    user = await Admin.findOne({ email: email });
  } else {
    user = await User.findOne({ email: email });
  }

  if (!user) {
    throw new NotFoundError("User with such email doesn't exists.");
  }

  // create a token if user exists
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const token = jwt.sign(
    { email: user.email, id: user._id, userType: user.userType },
    secret,
    {
      expiresIn: "5m",
    }
  );

  // link to redirect users
  const link = `http://localhost:3000/reset-password/${user._id}/${token}`;

  // mailing the link
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mailer.fyp@gmail.com", // sender's email
      pass: "nosankypavvloewl", // generated gmail password
    },
  });

  let mailOptions = {
    from: "mailer.fyp@gmail.com",
    to: [email],
    subject: "Reset password link",
    text: "Hello this is testing",
    html: `<p>Click this link to be redirected to the reset password page: ${link}</p> <br/> <p>This link is valid only for 5 minutes.</p>`,
  };

  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      res
        .status(StatusCodes.CREATED)
        .json({ msg: "Email has been sent successfully." });
    }
  });
};

const resetPassword = async (req, res) => {
  const { id: userId, token } = req.params;
  let payload = {};
  let user = {};
  const secret = process.env.REFRESH_TOKEN_SECRET;

  // check if token is valid
  try {
    payload = jwt.verify(token, secret);
  } catch (error) {
    throw new BadRequestError("Invalid token");
  }

  // find the user
  if (payload.userType === ADMIN) {
    user = await Admin.findOne({ _id: userId });
  } else {
    user = await User.findOne({ _id: userId });
  }

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  // getting the new password
  const { newPassword } = req.body;

  if (newPassword.trim() === "") {
    throw new BadRequestError("Whitespaces are not valid passwords.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);

  // check if password matches the old one
  const isPasswordSame = await user.comparePassword(newPassword);
  if (isPasswordSame) {
    throw new BadRequestError(
      `New password cannot be same as the old password.`
    );
  }

  let updatedUser = {};
  // passing the newly hashed password
  if (payload.userType === ADMIN) {
    updatedUser = await Admin.findOneAndUpdate(
      { _id: userId },
      { password: hashedNewPassword },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { password: hashedNewPassword },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  res.status(200).json({ updatedUser });
};

module.exports = { forgotPassword, resetPassword };
