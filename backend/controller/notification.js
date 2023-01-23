const Notification = require("../models/Notification");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createNotification = async (req, res) => {};

module.exports = { createNotification };
