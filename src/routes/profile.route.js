const profileRouter = require("express").Router()
const uploadMiddleware = require("../middlewares/upload.middleware")
// const validate = require("../middlewares/validator.middleware")
const profileController = require("../controllers/profile.controller")

profileRouter.post("/", uploadMiddleware("picture"), profileController.updateProfile)

module.exports = profileRouter
