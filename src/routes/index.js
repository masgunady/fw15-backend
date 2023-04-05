const router = require("express").Router()

router.get("/", (request, response)=>{
    return response.json({
        success : true,
        message : "Backend is running well, OK"
    })
})

router.use("/users", require("./users.route"))

module.exports = router
