require("dotenv").config({
    path: ".env"
})

const express = require("express")
const app = express()
app.use(express.urlencoded({extended:false}))

app.use((request, response, next)=> {
    // response.setHeader("Access-Control-Allow-Origin", "https://cdpn.io")
    response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
    // response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
    response.setHeader("Access-Control-Allow-Headers", "Content-type")
    next()
})

app.use("/", require("./src/routes"))

const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`app running on port ${PORT}`)
})

process.env.TZ
console.log(new Date().toString())
