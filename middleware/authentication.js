const User = require('../models/User')
const jwt = require('jsonwebtoken')

const {UnauthenticatedError} = require('../errors')
const auth = (req,res,next) =>{

    const authHeader  = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Auth invalid ')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token,'jwtSecret')
        req.user = {
            userID:payload.userID,
            name:payload.name
        }
        next()
    } catch (error) {
        throw new UnauthenticatedError('authentications invalid ')
    }

      
}

module.exports =auth 