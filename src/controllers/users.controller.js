const errorHandler = require("../helpers/errorHandler.helper")
const userModel = require("../models/users.model")

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

// const checkEmail = (request)=>{
//     const inputEmail = request.body.email
//     if(!inputEmail.includes("@") && !inputEmail.split("@")[1].includes(".")){
//         return false
//     }
//     return true
// }



exports.createUser = async(request, response) => {
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
        if(!request.body.email.split("@")[1].includes(".")){
            throw Error("input_format_email_not_valid")
        }
        if(request.body.password == ""){
            throw Error("input_data_password_null")
        }

        const data = await userModel.insert(request.body)  
        return response.json({
            success: true,
            message: `Create user ${request.body.email} successfully`,
            result: data
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
        
        const data = await userModel.update(request.params.id, request.body)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update user successfully",
            response: data
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
