const Notification = require("../models/Notification");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createNotification = async (req, res) => {
  const sender = req.user.userId;
  req.body.sender = sender;

  const { title, message, receiver } = req.body;

  if (!title) {
    throw new BadRequestError("No title provided.");
  }

  if (!message) {
    throw new BadRequestError("No message provided.");
  }

  if (receiver.length === 0) {
    throw new BadRequestError("No receiver IDs provided.");
  }

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

  const notification = await Notification.findByIdAndUpdate(
    { _id: notificationId },
    { $push: { readBy: userId } }
  );

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
