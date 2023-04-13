const admin = require("express").Router()

admin.use("/users", require("./users.route"))

module.exports = admin
