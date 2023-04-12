const userRouter = require("express").Router()
const userController = require("../controllers/users.controller")
const validate = require("../middlewares/validator.middleware")


userRouter.get("/",validate("getAllUsers"), userController.getAllUsers)
userRouter.get("/:id", userController.getOneUser)
userRouter.post("/",validate("createUser"), userController.createUser)
userRouter.patch("/:id",validate("updateUser"), userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)

module.exports = userRouter
