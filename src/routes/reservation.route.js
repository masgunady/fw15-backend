const reservationRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
const reservationController = require("../controllers/reservation.controller")

// reservationRouter.get("/", reservationController.getProfile)
reservationRouter.post("/", reservationController.createReservation)
reservationRouter.post("/ticket", reservationController.pickTicket)

module.exports = reservationRouter
