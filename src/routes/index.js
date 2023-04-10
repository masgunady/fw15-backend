const router = require("express").Router()

router.get("/", (request, response)=>{
    return response.json({
        success : true,
        message : "Backend is running well, OK"
    })
})

router.use("/admin", require("./admin.route"))

router.use("*", (request, response)=>{
    return response.status(404).json({
        success:false,
        message:"Resource not found"
    })
})

module.exports = router
