const cityRouter = require("express").Router()
const cityController = require("../controllers/city.controller")

cityRouter.get("/", cityController.getCity)
cityRouter.get("/all-cities", cityController.getAllCities)

module.exports = cityRouter
