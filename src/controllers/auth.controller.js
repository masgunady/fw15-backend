const userModel = require("../models/users.model")
const profileModel = require("../models/profiles.model")
const errorHandler = require("../helpers/errorHandler.helper")
const jwt = require("jsonwebtoken")
const argon  = require("argon2")
const {APP_SECRET} = process.env

exports.login = async (request, response) => {
    try {
        const {email, password} = request.body

        const user = await userModel.findOneByEmail(email)
        if(!user){
            throw Error("wrong_credentials")
        }
        // const {username: checkUsername} = user
        // if(username !== checkUsername){
        //     throw Error("wrong_credentials")
        // }

        const verify = await argon.verify(user.password, password)
        if(!verify){
            throw Error("wrong_credentials")
        }

        const token = jwt.sign({id: user.id}, APP_SECRET)
        return response.json({
            success: true,
            message: "Login Success!",
            result: {token}
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}




exports.register = async (request, response) => {
    try {
        const {fullName, password, termAndCondition} = request.body

        if(termAndCondition !== 1){
            throw Error("invalid_term_and_condition")
        }

        const hash = await argon.hash(password)
        const data = {
            ...request.body,
            password: hash
        }
        const user = await  userModel.insert(data)
        const profileData = {
            fullName,
            userId: user.id
        }
        await profileModel.insert(profileData)
        const token = jwt.sign({id: user.id}, APP_SECRET)
        return response.json({
            success: true,
            message: "Register Success!",
            result: {token}
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}
