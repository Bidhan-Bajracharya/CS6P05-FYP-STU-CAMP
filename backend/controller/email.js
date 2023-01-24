const nodemailer = require("nodemailer");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const createEmail = async (req, res) => {
  const { title, message, year, department } = req.body;

  // find students enrolled in that year and department
  const receiver = await User.find(
    { year: year, department: department },
    "-_id email"
  );

  // array of emails of students
  const receiverEmails = receiver.map((receiver) => receiver.email);

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
    to: receiverEmails,
    subject: title,
    text: message,
  };

  // send mail
  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      res.status(StatusCodes.CREATED).json({ msg: "Email has been sent successfully." });
    }
  });
};

module.exports = { createEmail };
