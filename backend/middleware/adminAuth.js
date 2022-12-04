const {ADMIN} = require('../permission/role')
const {BadRequestError} = require('../errors')

const checkAdmin = (req, res, next) => {
    if (req.user.userType !== ADMIN){
        throw new BadRequestError('Not authorized.')
    }

    next();
}

module.exports = checkAdmin;