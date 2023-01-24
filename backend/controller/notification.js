const Notification = require("../models/Notification");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createNotification = async (req, res) => {
  const sender = req.user.userId;
  req.body.sender = sender;

  const { title, message, year, department } = req.body;

  if (!title) {
    throw new BadRequestError("No title provided.");
  }

  if (!message) {
    throw new BadRequestError("No message provided.");
  }

  if (!year) {
    throw new BadRequestError("No year was provided.");
  }

  if (!department) {
    throw new BadRequestError("No department was provided.");
  }

  // find students enrolled in that year and department
  const receiver = await User.find({year: year, department: department}, "_id");

  req.body.receiver = receiver;

  const notification = await Notification.create(req.body);
  res.status(StatusCodes.CREATED).json({ notification });
};

// all notifications respective to user
const getAllUserNotification = async (req, res) => {
  const { userId } = req.user;

  const notifications = await Notification.find({ receiver: userId }).sort([
    ["createdAt", -1],
  ]);

  res
    .status(StatusCodes.OK)
    .json({ notifications, count: notifications.length });
};

// single notification
const getNotification = async (req, res) => {
  const { id: notificationId } = req.params;

  const notification = await Notification.findOne({
    _id: notificationId,
  }).populate("receiver", "uni_id name department year");

  if (!notification) {
    throw new NotFoundError(`No report with id ${notificationId}`);
  }

  res.status(StatusCodes.OK).json({ notification });
};

// used to update the 'readBy' attribute
const updateNotification = async (req, res) => {
  const { id: notificationId } = req.params;
  const { userId } = req.user; // logged in user

  if (!userId) {
    throw new BadRequestError(`No user with id: ${userId} was found.`);
  }

  // check if the user has already seen the notification or not
  const userSeen = await Notification.find({ readBy: userId });

  if (userSeen.length !== 0){
    throw new BadRequestError(`User with id: ${userId} has already seen this notification.`);
  }

  // appending the userId in the array of readBy users
  const notification = await Notification.findByIdAndUpdate(
    { _id: notificationId },
    { $push: { readBy: userId } }
  );

  if (!notification) {
    throw new NotFoundError(`No report with id ${notificationId}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Notification marked as seen.", notification: notification });
};

const deleteNotification = async (req, res) => {
  const { id: notificationId } = req.params;

  const notification = await Notification.findOneAndRemove({
    _id: notificationId,
  });

  if (!notification) {
    throw new NotFoundError(`No report with id ${notificationId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "Deletion successful." });
};

module.exports = {
  createNotification,
  getNotification,
  deleteNotification,
  getAllUserNotification,
  updateNotification,
};
