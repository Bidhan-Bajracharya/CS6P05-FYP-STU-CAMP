const User = require("../models/User");
const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");

const viewAllUsers = async (req, res) => {
  //   uni_id:: string;
  //   name:: string;
  //   profile_pic:: string;
  //   userType: number;
  //   department:: string;
  //   section:: string;
  //   year:: number;
  //   email: string;
  //   password: string;
    const users = await User.find({});

    const abc = async (userDetail) => {
      // return await()
    }
    const viewDetail = {
      uni_id: users.uni_id,
      name:users.name,
      profile_pic:users.profile_pic,
      department:users.department,
      section:users.section,
      year:users.year,
    }
    res.status(StatusCodes.OK).json({ viewDetail });
};

const viewAllPosts = async(req, res) => {
  const posts = await Post.find({}).sort("createdAt")
  res.status(StatusCodes.OK).json({ posts, count: posts.length });
}

module.exports = {
  viewAllUsers, viewAllPosts
};
