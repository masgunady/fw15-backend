const reservationSectionRoute = require("express").Router()
const reservationSectionsController = require("../../controllers/admin/reservationSections.controller")
const validate = require("../../middlewares/validator.middleware")


reservationSectionRoute.get("/", reservationSectionsController.getAllReservationSections)
reservationSectionRoute.get("/:id", reservationSectionsController.getOneReservationSection)
reservationSectionRoute.post("/", reservationSectionsController.createReservationSection)
reservationSectionRoute.patch("/:id", reservationSectionsController.updateReservationSection)
reservationSectionRoute.delete("/:id",validate("delete"), reservationSectionsController.deleteReservationSection)

module.exports = reservationSectionRoute
