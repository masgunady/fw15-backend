const profileRoute = require("express").Router()
const profileController = require("../../controllers/admin/profiles.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")



profileRoute.get("/",validate("getAllUserProfiles"), profileController.getAllUserProfiles)
profileRoute.get("/:id",validate("getOneUserProfile"), profileController.getOneUserProfile)
profileRoute.post("/", uploadMiddleware("picture"),validate("createUserProfile"), profileController.createUser)
profileRoute.patch("/:id", uploadMiddleware("picture"), validate("updateUserProfile"), profileController.updateUser)
profileRoute.delete("/:id",validate("deleteUser"), profileController.deleteUser)

module.exports = profileRoute
