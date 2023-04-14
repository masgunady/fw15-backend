const partnerRoute = require("express").Router()
const partnersController = require("../../controllers/admin/partners.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")



partnerRoute.get("/", partnersController.getAllPartners)
partnerRoute.get("/:id", partnersController.getOnePartner)
partnerRoute.post("/", uploadMiddleware("picture"), partnersController.createPartner)
partnerRoute.patch("/:id", uploadMiddleware("picture"), partnersController.updatePartner)
partnerRoute.delete("/:id",validate("delete"), partnersController.deletePartner)

module.exports = partnerRoute
