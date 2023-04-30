const eventRouter = require("express").Router()
const validate = require("../middlewares/validator.middleware")
const eventController = require("../controllers/event.controller")
const uploadMiddleware = require("../middlewares/upload.middleware")
const authMiddleware = require("../middlewares/auth.middleware")


eventRouter.get("/", eventController.getEvent)
eventRouter.get("/manage", authMiddleware, eventController.getOurEventCreate)
eventRouter.get("/:id", eventController.getDetailEvent)
eventRouter.post("/manage", authMiddleware, uploadMiddleware("picture"), validate("createEvent"), eventController.createOurEvent)
eventRouter.patch("/manage/:id", authMiddleware, uploadMiddleware("picture"), eventController.updateOurEvent)
eventRouter.get("/manage/:id", authMiddleware, eventController.getDetailEvent)
eventRouter.delete("/manage/:id", authMiddleware,validate("delete"), eventController.deleteEvent)

// eventRouter.post("/" , eventController.manageWishlist)

module.exports = eventRouter
