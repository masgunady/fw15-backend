const reservationStatusRoute = require("express").Router()
const reservationStatusController = require("../../controllers/admin/reservationStatus.controller")
const validate = require("../../middlewares/validator.middleware")


reservationStatusRoute.get("/", reservationStatusController.getAllReservationStatus)
reservationStatusRoute.get("/:id", reservationStatusController.getOneReservationStatus)
reservationStatusRoute.post("/", reservationStatusController.createReservationStatus)
reservationStatusRoute.patch("/:id", reservationStatusController.updateReservationStatus)
reservationStatusRoute.delete("/:id",validate("delete"), reservationStatusController.deleteReservationStatus)

module.exports = reservationStatusRoute
