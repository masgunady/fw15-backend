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

router.use("*", (request, response)=>{
    return response.status(404).json({
        success:false,
        message:"Resource not found"
    })
})

module.exports = router
