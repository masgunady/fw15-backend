const admin = require("express").Router()

admin.use("/users", require("./users.route"))
admin.use("/profiles", require("./profiles.route"))
admin.use("/cities", require("./cities.route"))
admin.use("/categories", require("./categories.route"))
admin.use("/events", require("./events.route"))
admin.use("/eventCategories", require("./eventCategories.route"))
admin.use("/partners", require("./partners.route"))

module.exports = admin
