const partnerRouter = require("express").Router()
const partnerController = require("../controllers/partner.controller")

partnerRouter.get("/", partnerController.getPartner)

module.exports = partnerRouter
