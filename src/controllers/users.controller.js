const errorHandler = require("../helpers/errorHandler.helper")
const userModel = require("../models/users.model")
const argon =  require("argon2")

exports.getAllUsers = async(request, response)=>{
    try{
        const data = await userModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all users",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}
exports.getOneUser = async(request, response)=>{
    try{
        const data = await userModel.findOne(request.params.id)

        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail User",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }

    // Kode Versi 1.0
    // try{
    //     const data = await userModel.findOne(request.params.id)
  
    //     if(data){
    //         return response.json({
    //             success: true,
    //             message:"Detail User",
    //             result:data
    //         })
    //     }

    //     return errorHandler(response, data)
    // }catch(err){
    //     return errorHandler(response, err)
    // }
}

const validEmail = (request)=>{
    const {email} = request.body
    if(email.includes("@") && email.split("@")[1]?.includes(".")){
        return false
    }
    return true
}



exports.createUser = async(request, response) => {
    try{

        const {fullName, email, password, confirmPassword} = request.body
        if(fullName == ""){
            throw Error("input_data_fullName_null")
        }
        if(email == ""){
            throw Error("input_data_email_null")
        }
        if(validEmail(request)){
            throw Error("input_format_email_not_valid")
        }

        if(password == ""){
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
        return response.json({
            success: true,
            message: `Create user ${email} successfully`,
            result: user
        })
    }catch(err){
        return errorHandler(response, err)
    }

    // code versi 1.0
    // try{
    //     const data = await userModel.insert(request.body)  
    //     return response.json({
    //         success: true,
    //         message: `Create user ${request.body.email} successfully`,
    //         result: data
    //     })
    // }catch(err){
    //     return errorHandler(response, err)
    // }
}  

exports.updateUser = async(request, response) => {
    try{

        if(request.body.fullName == ""){
            throw Error("input_data_fullName_null")
        }
        if(request.body.email == ""){
            throw Error("input_data_email_null")
        }
        if(!request.body.email.includes("@")){
            throw Error("input_format_email_not_valid")
        }
        if(request.body.password == ""){
            throw Error("input_data_password_null")
        }

        const hash = await argon.hash(request.body.password)
        const data = {
            ...request.body,
            password: hash
        }
        const user = await userModel.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update user successfully",
            response: user
        })
        
        
    }catch(err){
        return errorHandler(response, err)
    }
    // code versi 1.0
    // try{
    //     const data = await userModel.findOne(request.params.id)
    //     if(data){
    //         const data = await userModel.update(request.params.id, request.body)
    //         return response.json({
    //             success: true,
    //             message: "Update user successfully",
    //             response: data
    //         })
    //     }
    //     return errorHandler(response, data)
    // }catch(err){
    //     return errorHandler(response, err)
    // }
}

exports.deleteUser = async(request, response)=>{
  
    try {
        const data = await userModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete user successfully",
            result:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }


    // code versi 1.0
    // try{
    //     const data = await userModel.findOne(request.params.id)
    //     if(data){
    //         const data = await userModel.destroy(request.params.id)
    //         return response.json({
    //             success: true,
    //             message: "Delete user successfully",
    //             result:data
    //         })
    //     }
    //     return errorHandler(response, data)
    // }catch(err){
    //     return errorHandler(response, err)
    // }
    
}
