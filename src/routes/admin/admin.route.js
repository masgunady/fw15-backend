const admin = require("express").Router()

admin.use("/users", require("./users.route"))
admin.use("/profiles", require("./profiles.route"))
admin.use("/cities", require("./cities.route"))
admin.use("/categories", require("./categories.route"))
admin.use("/events", require("./events.route"))

module.exports = admin
