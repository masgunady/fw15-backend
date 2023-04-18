const fileRemover = require("../helpers/fileRemover.helper")
const profilesModel = require("../models/profiles.model")

exports.updateProfile = async (request, response) => {
    const {id} = request.user
    // console.log(request.user)
    const user = await profilesModel.findOneByUserId(id)

    const data = {
        ...request.body
    }

    if(request.file){
        if(user.picture){
            fileRemover({filename: user.picture})
        }
        data.picture = request.file.filename
    }

    const profile = await profilesModel.updateByUserId(id, data)

    if(!profile){
        throw Error("update_profile_failed")
    }

    return response.json({
        success: true,
        message: "profile updated",
        results: profile
    })
}
