var admin = require("firebase-admin")

// var serviceAccount = require("../../pushnotif-eventapp-firebase-adminsdk-jl2vm-582bd74ba8.json")

var serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = admin
