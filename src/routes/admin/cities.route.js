const cityRoute = require("express").Router()
const citiesController = require("../../controllers/admin/cities.controller")
const validate = require("../../middlewares/validator.middleware")
const uploadMiddleware = require("../../middlewares/upload.middleware")



cityRoute.get("/", citiesController.getAllCities)
cityRoute.get("/:id", citiesController.getOneCity)
cityRoute.post("/", uploadMiddleware("picture"), citiesController.createCity)
cityRoute.patch("/:id", uploadMiddleware("picture"), citiesController.updateCity)
cityRoute.delete("/:id",validate("delete"), citiesController.deleteCity)

module.exports = cityRoute
