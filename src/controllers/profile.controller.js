const profilesModel = require("../models/profiles.model")

exports.updateProfile = async (request, response) => {
    const {id} = request.user
    const user = await profilesModel.updateByUserId(id, request.body)

    if(!user){
        throw Error("update_profile_failed")
    }

    return response.json({
        success: true,
        message: "profile update"
    })
}
