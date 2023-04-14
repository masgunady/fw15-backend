const paymentMethodRoute = require("express").Router()
const paymentMethodsController = require("../../controllers/admin/paymentMethods.controller")
const validate = require("../../middlewares/validator.middleware")


paymentMethodRoute.get("/", paymentMethodsController.getAllPaymentMethods)
paymentMethodRoute.get("/:id", paymentMethodsController.getOnePaymentMethod)
paymentMethodRoute.post("/", paymentMethodsController.createPaymentMethod)
paymentMethodRoute.patch("/:id", paymentMethodsController.updatePaymentMethod)
paymentMethodRoute.delete("/:id",validate("delete"), paymentMethodsController.deletePaymentMethod)

module.exports = paymentMethodRoute
