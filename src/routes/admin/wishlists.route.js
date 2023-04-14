const wishlistRoute = require("express").Router()
const wishlistsController = require("../../controllers/admin/wishlists.controller")
const validate = require("../../middlewares/validator.middleware")


wishlistRoute.get("/", wishlistsController.getAllWishlists)
wishlistRoute.get("/:id", wishlistsController.getOneWishlist)
wishlistRoute.post("/", wishlistsController.createWishlist)
wishlistRoute.patch("/:id", wishlistsController.updateWishlist)
wishlistRoute.delete("/:id",validate("delete"), wishlistsController.deleteWishlist)

module.exports = wishlistRoute
