const errorHandler = require("../helpers/errorHandler.helper")
const deviceTokenModel = require("../models/deviceToken.model")

exports.saveToken = async (req, res) => {
    try {
        const {id} = req.user
        const {token} = req.body
        const savedData = await deviceTokenModel.insertToken(id, {token})
        return res.json({
            success: true,
            message: "token saved",
            results: {
                token : savedData.token
            }
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

