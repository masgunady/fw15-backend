const userModel = require("../models/users.model")
const errorHandler = require("../helpers/errorHandler.helper")
const jwt = require("jsonwebtoken")
const argon  = require("argon2")
const {APP_SECRET} = process.env

const validEmail = (request)=>{
    const {email} = request.body
    if(email.includes("@") && email.split("@")[1]?.includes(".")){
        return false
    }
    return true
}

exports.login = async (request, response) => {
    try {
        const {email, password} = request.body

        if(email === ""){
            throw Error("input_data_email_null")
        }
        if(validEmail(request)){
            throw Error("input_format_email_not_valid")
        }
        if(password === ""){
            throw Error("input_data_password_null")
        }

        const user = await userModel.findOneByEmail(email)
        if(!user){
            throw Error("wrong_credentials")
        }

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
    // if(user){
    //     if(password === user.password){
    //         return response.json({
    //             success : true,
    //             message : "Login Success"
    //         })
    //     }else{
    //         return response.status(401).json({
    //             success: false,
    //             message: "Wrong username or password"
    //         })
    //     }
    // }else{
    //     return response.status(401).json({
    //         success: false,
    //         message: "Wrong username or password"
    //     })
    // }

}




exports.register = async (request, response) => {
    try {
        const {fullName, email, password, confirmPassword} = request.body

        if(fullName === ""){
            throw Error("input_data_fullName_null")
        }
        if(email === ""){
            throw Error("input_data_email_null")
        }
        if(validEmail(request)){
            throw Error("input_format_email_not_valid")
        }
        if(password === ""){
            throw Error("input_data_password_null")
        }
        if(password.length < 8){
            throw Error("input_password_min_length_8")
        }

        if(password !== confirmPassword){
            throw Error("password_unmatch")
        }


        const hash = await argon.hash(password)
        const data = {
            ...request.body,
            password: hash
        }
        const user = await  userModel.insert(data)
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
