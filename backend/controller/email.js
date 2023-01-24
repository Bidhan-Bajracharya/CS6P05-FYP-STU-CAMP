const nodemailer = require("nodemailer");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createEmail = (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mailer.fyp@gmail.com", // sender's email
      pass: "nosankypavvloewl", // generated gmail password
    },
    // tls:{
    //     rejectUnauthorized: false,
    // }
  });

  let mailOptions = {
    from: "mailer.fyp@gmail.com",
    to: "bidhangoku@gmail.com",
    subject: "Testing",
    text: "Hello from node boi 2.",
  };

  // send mail
  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      res.status(StatusCodes.CREATED).json({ msg: "Email sent boii." });
    }
  });
};

module.exports = { createEmail };
