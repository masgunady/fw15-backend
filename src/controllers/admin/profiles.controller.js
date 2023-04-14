const errorHandler = require("../../helpers/errorHandler.helper")
const profilesModel = require("../../models/profiles.model")
const fileRemover = require("../../helpers/fileRemover.helper")
const fs = require("fs")

exports.getAllUserProfiles = async(request, response)=>{
    try{
        const data = await profilesModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all user profiles",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneUserProfile = async(request, response)=>{
    try{
        const data = await profilesModel.findOne(request.params.id)

        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail profile",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createUserProfile = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        if(request.file){
            data.picture = request.file.filename
        }
        const profile = await  profilesModel.insert(data)
        return response.json({
            success: true,
            message: "Create user profile successfully",
            result: profile
        })
    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }
}  

exports.updateUserProfile = async(request, response) => {
    try{

        const data = {
            ...request.body
        }
        if(request.file){
            data.picture = request.file.filename
        }

        const oldPict = await profilesModel.findUserPict(request.params.id)
        const fileName = `uploads/${oldPict.picture}`
        fs.unlink(fileName, (err)=>{
            if(err){
                throw Error(err.message)
            }
        })


        const user = await profilesModel.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update user profile successfully",
            response: user
        })
        
        
    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }

}

exports.deleteUserProfile = async(request, response)=>{
  
    try {
        const data = await profilesModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete user profile successfully",
            result:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }

    
}
