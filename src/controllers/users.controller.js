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
    try{
        const data = await userModel.findOne(request.params.id)
  
        if(data){
            return response.json({
                success: true,
                message:"Detail User",
                result:data
            })
        }

        return errorHandler(response, data)
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createUser = async(request, response) => {
    try{
        const data = await userModel.insert(request.body)  
        return response.json({
            success: true,
            message: `Create user ${request.body.email} successfully`,
            result: data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}  

exports.updateUser = async(request, response) => {
    try{
        const data = await userModel.findOne(request.params.id)
        if(data){
            const data = await userModel.update(request.params.id, request.body)
            return response.json({
                success: true,
                message: "Update user successfully",
                response: data
            })
        }
        return errorHandler(response, data)
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.deleteUser = async(request, response)=>{
    try{
        const data = await userModel.findOne(request.params.id)
        if(data){
            const data = await userModel.destroy(request.params.id)
            return response.json({
                success: true,
                message: "Delete user successfully",
                result:data
            })
        }
        return errorHandler(response, data)
    }catch(err){
        return errorHandler(response, err)
    }
    // try{
    //     const data = await userModel.destroy(request.params.id)
    //     if(data){
    //         console.log(data.rows)
    //         // return response.json({
    //         //     success: true,
    //         //     message: "Delete user successfully",
    //         //     result:data
    //         // })
    //     }
    //     console.log(data)
    //     return errorHandler(response, data)

    // }catch(err){
    //     return errorHandler(response, err)
    // }


    // const data = await userModel.destroy(request.params.id)
    // if(data > 1){
    //     return response.json({
    //         success:true,
    //         message: "Delete User Successfully",
    //         response:data
    //     })
    // }

    // return errorHandler(response, data)
}
