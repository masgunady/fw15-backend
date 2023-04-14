const reservationTicketRoute = require("express").Router()
const reservationTicketsController = require("../../controllers/admin/reservationTickets.controller")
const validate = require("../../middlewares/validator.middleware")


reservationTicketRoute.get("/", reservationTicketsController.getAllReservationTickets)
reservationTicketRoute.get("/:id", reservationTicketsController.getOneReservationTicket)
reservationTicketRoute.post("/", reservationTicketsController.createReservationTicket)
reservationTicketRoute.patch("/:id", reservationTicketsController.updateReservationTicket)
reservationTicketRoute.delete("/:id",validate("delete"), reservationTicketsController.deleteReservationTicket)

module.exports = reservationTicketRoute
