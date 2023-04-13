const userRouter = require("express").Router()
const userController = require("../controllers/users.controller")
const validate = require("../middlewares/validator.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")



userRouter.get("/",validate("getAllUsers"), userController.getAllUsers)
userRouter.get("/:id",validate("getOneUser"), userController.getOneUser)
userRouter.post("/", uploadMiddleware("picture"), validate("createUser"), userController.createUser)
userRouter.patch("/:id", uploadMiddleware("picture"), validate("updateUser"), userController.updateUser)
userRouter.delete("/:id",validate("deleteUser"), userController.deleteUser)

module.exports = userRouter
