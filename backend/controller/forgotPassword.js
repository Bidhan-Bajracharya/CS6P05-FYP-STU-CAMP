const User = require("../models/User");
const { NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // find if user exists or not
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new NotFoundError("User with such email doesn't exists.");
  }

  // create a token if user exists
  const secret = process.env.REFRESH_TOKEN_SECRET + user.password;
  const token = jwt.sign({ email: user.email, id: user._id }, secret, {
    expiresIn: "5m",
  });

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
    text: link,
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

module.exports = { forgotPassword };
