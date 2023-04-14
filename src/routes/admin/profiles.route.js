const profileRoute = require("express").Router()
const profileController = require("../../controllers/admin/profiles.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")



profileRoute.get("/", profileController.getAllUserProfiles)
profileRoute.get("/:id", profileController.getOneUserProfile)
profileRoute.post("/", uploadMiddleware("picture"), profileController.createUserProfile)
profileRoute.patch("/:id", uploadMiddleware("picture"), profileController.updateUserProfile)
profileRoute.delete("/:id",validate("delete"), profileController.deleteUserProfile)

module.exports = profileRoute
