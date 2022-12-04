const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const auth = async(req, res, next) => {
    // checking for token
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication failed')
    }

    // taking the encoded token
    const token = authHeader.split(" ")[1];

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, name: payload.name, userType: payload.userType}
        next()
    }catch(error){
        throw new UnauthenticatedError('Authentication invalid')
    }
}

module.exports = auth;