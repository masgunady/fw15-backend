const reservationRoute = require("express").Router()
const reservationsController = require("../../controllers/admin/reservations.controller")
const validate = require("../../middlewares/validator.middleware")


reservationRoute.get("/", reservationsController.getAllReservations)
reservationRoute.get("/:id", reservationsController.getOneReservation)
reservationRoute.post("/", reservationsController.createReservation)
reservationRoute.patch("/:id", reservationsController.updateReservation)
reservationRoute.delete("/:id",validate("delete"), reservationsController.deleteReservation)

module.exports = reservationRoute
