const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')

const login = async(req, res) => {
    res.send("logged in")
}

module.exports = login;