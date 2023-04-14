const categoryRoute = require("express").Router()
const categoriesController = require("../../controllers/admin/categories.controller")
const validate = require("../../middlewares/validator.middleware")


categoryRoute.get("/", categoriesController.getAllCategories)
categoryRoute.get("/:id", categoriesController.getOneCategory)
categoryRoute.post("/", categoriesController.createCategory)
categoryRoute.patch("/:id", categoriesController.updateCategory)
categoryRoute.delete("/:id",validate("delete"), categoriesController.deleteCategory)

module.exports = categoryRoute
