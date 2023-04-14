const eventCategoryRoute = require("express").Router()
const eventCategoriesController = require("../../controllers/admin/eventCategories.controller")
const validate = require("../../middlewares/validator.middleware")


eventCategoryRoute.get("/", eventCategoriesController.getAllEventCategories)
eventCategoryRoute.get("/:id", eventCategoriesController.getOneEventCategory)
eventCategoryRoute.post("/", eventCategoriesController.createEventCategory)
eventCategoryRoute.patch("/:id", eventCategoriesController.updateEventCategory)
eventCategoryRoute.delete("/:id",validate("delete"), eventCategoriesController.deleteEventCategory)

module.exports = eventCategoryRoute
