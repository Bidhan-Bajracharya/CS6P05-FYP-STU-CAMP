const Report = require("../models/Report");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createReport = async (req, res) => {
  const reportingUserId = req.user.userId;
  req.body.reportingUserId = reportingUserId;

  const reportedUserUniId = req.body.reportedUser;

  if (!reportedUserUniId) {
    throw new BadRequestError("No University ID provided.");
  }

  // find user._id, of reported user
  const reportedUserId = await User.findOne(
    { uni_id: reportedUserUniId },
    "_id"
  );
  req.body.reportedUserId = reportedUserId._id;

  const report = await Report.create(req.body);
  res.status(StatusCodes.CREATED).json({ report });
};

const getAllReports = async (req, res) => {
  const reports = await Report.find({})
    .populate("reportedUserId", "uni_id name department section year")
    .populate("reportingUserId", "uni_id name department section year")
    .sort("createdAt");
  res.status(StatusCodes.OK).json({ reports, count: reports.length });
};

const getReport = async (req, res) => {
  const { id: reportId } = req.params;
  const report = await Report.findOne({ _id: reportId })
    .populate("reportedUserId", "uni_id name department section year")
    .populate("reportingUserId", "uni_id name department section year");

  if (!report) {
    throw new NotFoundError(`No report with id ${reportId}`);
  }

  res.status(StatusCodes.OK).json({ report });
};

const updateReport = async (req, res) => {
  const { id: reportId } = req.params;
  const { resolved } = req.body;

  if (typeof resolved !== "boolean") {
    throw new BadRequestError("Please enter valid resolve status.");
  }

  const report = await Report.findByIdAndUpdate({ _id: reportId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!report) {
    throw new NotFoundError(`No report with id ${reportId}`);
  }

  res.status(StatusCodes.OK).json({ report });
};

const deleteReport = async (req, res) => {
  const { id: reportId } = req.params;

  const report = await Report.findOneAndRemove({ _id: reportId });
  if (!report) {
    throw new NotFoundError(`No report with id ${reportId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createReport,
  getAllReports,
  getReport,
  updateReport,
  deleteReport,
};
