const {Pool} = require("pg")

const db = new Pool({
    connectionString: process.env.DATABASE
})

db.connect().then(()=>{
    console.log("Database connected!")
}).catch(()=>{
    console.log("Database connection failed!")
})

module.exports = db
