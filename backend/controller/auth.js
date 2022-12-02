const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const login = async (req, res) => {
  const {email, password} = req.body

  if (!email || !password){
    throw new BadRequestError("Please provide email and password.")
  }

  const user = await User.findOne({email})

  // if user does not exists
  if(!user){
    throw new UnauthenticatedError("Invalid credentials.")
  }

  // check password
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid credentials')
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({user:{name: user.name}, token})
};

module.exports = login;