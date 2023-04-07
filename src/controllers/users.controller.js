const errorHandler = require("../helpers/errorHandler.helper")
const userModel = require("../models/users.model")

exports.getAllUsers = async(request, response)=>{
    const data = await userModel.findAll()
    return response.json({
        success: true,
        message:"list of all users",
        result:data
    })
}
exports.getOneUser = async(request, response)=>{
    const data = await userModel.findOne(request.params.id)
  
    if(data){
        return response.json({
            success: true,
            message:"Detail User",
            result:data
        })
    }
    return response.status(404).json({
        success: false,
        message:"User not found",
    })
}

exports.createUser = async(request, response) => {
    try{
        const data = await userModel.insert(request.body)  
        return response.json({
            success: true,
            message: `Create user ${request.body.email} successfully`,
            result: data
        })
    }catch(error){
        return errorHandler(response, error)
    }
}  

exports.updateUser = async(request, response) => {
    const data = await userModel.update(request.params.id, request.body)
    return response.json({
        success: true,
        message: "Update user successfully",
        response: data
    })
}

exports.deleteUser = async(request, response)=>{
    const data = await userModel.destroy(request.params.id)
    return response.json({
        success: true,
        message: "Delete user successfully",
        result:data
    })
}
