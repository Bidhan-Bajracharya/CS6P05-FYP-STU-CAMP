const Notification = require("../models/Notification");
const User = require("../models/User");
const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createNotification = async (req, res) => {
  const sender = req.user.userId;
  const { notiType } = req.body;
  req.body.sender = sender;

  const { title, message } = req.body;
  const { year, department } = req.body; // from admin notices
  const { postId } = req.body; // from comment notices
  let receiver = [];

  if (!notiType) {
    throw new BadRequestError("Specify type of notification.");
  }

  if (!title) {
    throw new BadRequestError("No title provided.");
  }

  if (!message) {
    throw new BadRequestError("No message provided.");
  }

  if (notiType === "Admin") {
    if (!year) {
      throw new BadRequestError("No year was provided.");
    }

    if (!department) {
      throw new BadRequestError("No department was provided.");
    }

    // find students enrolled in that year and department
    receiver = await User.find({ year: year, department: department }, "_id");
  }

  if (notiType === "User") {
    // if the notification was of type 'mention', mention the users
    if (req.body.isMentioned !== undefined) {
      const mentionedUserIds = req.body.receiverUniId;
      if (!mentionedUserIds) {
        throw new BadRequestError("No mentioned users provided.");
      }
      const receiverIds = await User.find(
        { uni_id: { $in: mentionedUserIds } },
        "_id"
      );
      receiver = receiverIds.map((obj) => obj._id);
    }
    // notify the owner of the post
    else {
      if (!postId) {
        throw new BadRequestError("No postId provided.");
      }

      // finding the owner of the post
      const owner = await Post.findOne({ _id: postId }, "createdBy").populate(
        "createdBy",
        "_id"
      );
      receiver = [owner.createdBy._id];
    }
  }

  req.body.receiver = receiver;

  const notification = await Notification.create(req.body);
  res.status(StatusCodes.CREATED).json({ notification });
};

// all notifications respective to user
const getAllUserNotification = async (req, res) => {
  const { userId } = req.user;

  const notifications = await Notification.find({ receiver: userId })
    .populate("sender", "name")
    .sort([["createdAt", -1]]);

  res
    .status(StatusCodes.OK)
    .json({ notifications, count: notifications.length });
};

// view all admin type notifications - by admin
const getAllNotifications = async (req, res) => {
  const notifications = await Notification.find({ notiType: "Admin" })
    .populate("sender", "name")
    .sort([["createdAt", -1]]);

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
  const { notificationIds } = req.body;
  const { userId } = req.user; // logged in user

  if (notificationIds.length === 0) {
    throw new NotFoundError(`No notifications provided`);
  }

  if (!userId) {
    throw new BadRequestError(`No user with id: ${userId} was found.`);
  }

  // check if the user has already seen the notifications or not
  // ... frontend sends unread notifications only, but additional checking logic can be put later

  // appending the userId in the array of readBy users for respective notifications
  const updatedNotifications = await Notification.updateMany(
    { _id: { $in: notificationIds } },
    { $push: { readBy: userId } }
  );

  res.status(StatusCodes.OK).json({ msg: "Notifications marked as seen." });
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
  getAllNotifications,
};
