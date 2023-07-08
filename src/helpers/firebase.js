var admin = require("firebase-admin")

var serviceAccount = require("../../pushnotif-eventapp-firebase-adminsdk-jl2vm-582bd74ba8.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = admin
