const paymentRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
const paymentController = require("../controllers/payment.controller")

paymentRouter.post("/", paymentController.makePayment)
// paymentRouter.post("/ticket", paymentController.pickTicket)

module.exports = paymentRouter
