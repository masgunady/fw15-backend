const admin = require("express").Router()

admin.use("/users", require("./users.route"))
admin.use("/profiles", require("./profiles.route"))

module.exports = admin
