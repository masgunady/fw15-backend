// const jwt = require("jsonwebtoken")
const errorHandler = require("../helpers/errorHandler.helper")
const authMiddleware = (request, response, next) => {

    try {
        const {authorization: auth} = request.headers
        if(!auth && !auth?.startsWith("Bearer ")){
            throw Error("unauthorized")
        }

        const token = auth.slice(7)
        console.log(token)

        return next()
    } catch (err) {
        return errorHandler(response, err)
    }
}

module.exports = authMiddleware
