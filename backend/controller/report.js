const Report = require("../models/Report");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createReport = async (req, res) => {
  const reportingUserId = req.user.userId;
  req.body.reportingUserId = reportingUserId;

  const reportedUserId = req.body.reportedUser;

  // checking if post's id is provided
  if(!req.body.reportedPostId){
    throw new BadRequestError("No post id provided.");
  }

  // checking if _id is provided
  if (!reportedUserId) {
    throw new BadRequestError("No id provided.");
  }

  // find the user
  const checkUser = await User.findOne({ _id: reportedUserId });

  // checking if the entered _id is correct
  if (!checkUser) {
    throw new BadRequestError("No such ID exists.");
  }

  req.body.reportedUserId = reportedUserId;

  const report = await Report.create(req.body);
  res.status(StatusCodes.CREATED).json({ report });
};

const getAllReports = async (req, res) => {
  // populating the reported and reporting user info
  const reports = await Report.find({})
    .populate("reportedUserId", "uni_id name department section year")
    .populate("reportingUserId", "uni_id name department section year")
    .sort([["createdAt", -1]]); // sort by createdAt in descending order
  res.status(StatusCodes.OK).json({ reports, count: reports.length });
};

const getReport = async (req, res) => {
  const { id: reportId } = req.params;

  // populating the reported and reporting user info
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

  res.status(StatusCodes.OK).json({ msg: "Report marked as resolved." });
};

const deleteReport = async (req, res) => {
  const { id: reportId } = req.params;

  const report = await Report.findOneAndRemove({ _id: reportId });
  if (!report) {
    throw new NotFoundError(`No report with id ${reportId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Deletion successful." });
};

module.exports = {
  createReport,
  getAllReports,
  getReport,
  updateReport,
  deleteReport,
};
