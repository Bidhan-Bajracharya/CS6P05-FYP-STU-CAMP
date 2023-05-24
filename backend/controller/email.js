const nodemailer = require("nodemailer");
const User = require("../models/User");
const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");

const createEmail = async (req, res) => {
  const { title, message, year, department, emailType, postId, receiverUniId } =
    req.body;
  let receiverEmails = [];

  if (emailType === "Admin") {
    // find students enrolled in that year and department
    const receiver = await User.find(
      { year: year, department: department },
      "-_id email notification"
    );

    // array of emails of students
    // who have 'adminEmail' feature turned on
    receiverEmails = receiver
      .filter((receiver) => receiver.notification.adminEmail)
      .map((receiver) => receiver.email);
  }

  // email about comment on post
  else if (emailType === "Comment") {
    // finding the post owner's email
    const owner = await Post.findOne({ _id: postId }, "createdBy").populate(
      "createdBy",
      "email notification"
    );

    if (owner.createdBy.notification.commentEmail) {
      receiverEmails = [owner.createdBy.email];
    }
  }
  
  // email about mentioned in comments
  else if (emailType === "Mention") {
    // finding the email of the mentioned users
    const receiverMails = await User.find(
      { uni_id: { $in: receiverUniId } },
      "email notification"
      );
      
    receiverEmails = receiverMails
      .filter((receiver) => receiver.notification.mentionEmail)
      .map((receiver) => receiver.email);
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mailer.fyp@gmail.com", // sender's email
      pass: process.env.MAIL_PASSWORD, // generated gmail password
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
  if (receiverEmails.length > 0) {
    transporter.sendMail(mailOptions, function (err, success) {
      if (err) {
        console.log(err);
      } else {
        res
          .status(StatusCodes.CREATED)
          .json({ msg: "Email has been sent successfully." });
      }
    });
  } else {
    res
      .status(StatusCodes.NO_CONTENT)
      .json({ msg: "No recepients were found." });
  }
};

module.exports = { createEmail };
