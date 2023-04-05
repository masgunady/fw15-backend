require("dotenv").config({
    path: ".env"
})

const express = require("express")
const app = express()
app.use(express.urlencoded({extended:false}))

app.use("/", require("./src/routes"))

const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`app running on port ${PORT}`)
})
