const changePasswordRouter = require("express").Router()

const changePasswordController = require("../controllers/changePassword.controller")

changePasswordRouter.post("/", changePasswordController.changePassword)

module.exports = changePasswordRouter
