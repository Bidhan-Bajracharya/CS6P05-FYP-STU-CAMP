const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const auth = async(req, res, next) => {
    // checking for token
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication invalid.')
    }

    // taking the encoded token
    const token = authHeader.split(" ")[1];

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, name: payload.name, userType: payload.userType}
        next()
    }catch(error){
        // return res.sendStatus(401)
        throw new UnauthenticatedError('Authentication failed.')
    }
}

module.exports = auth;