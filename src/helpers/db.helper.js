const {Pool} = require("pg")

const db = new Pool({
    connectionString: process.env.DATABASE
})

db.connect().then(()=>{
    // console.log(stat)
    console.log("Database connected!")
}).catch((error)=>{
    console.log(error.message)
    console.log(`Error Code : ${error.code}`)
    console.log("Database connection failed!")
})

module.exports = db
