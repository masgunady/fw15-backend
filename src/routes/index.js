const router = require("express").Router()
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", (request, response)=>{
    return response.json({
        success : true,
        message : "Backend is running well, OK"
    })
})

router.use("/auth", require("./auth.route"))
router.use("/admin", authMiddleware, require("./admin/admin.route"))
router.use("/profile", authMiddleware, require("./profile.route"))
router.use("/category", authMiddleware, require("./category.route"))
router.use("/city", authMiddleware, require("./city.route"))
router.use("/partner", authMiddleware, require("./partner.route"))
router.use("/change-password", authMiddleware, require("./changePassword.route"))
router.use("/wishlist", authMiddleware, require("./wishlist.route"))
router.use("/event", require("./event.route"))
router.use("/reservation", authMiddleware, require("./reservation.route"))
router.use("/payment", authMiddleware, require("./payment.route"))

router.use("*", (request, response)=>{
    return response.status(404).json({
        success:false,
        message:"Resource not found"
    })
})

module.exports = router
