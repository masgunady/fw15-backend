const db = require("../helpers/db.helper")

// exports.findUser = function(){
//     return db.query("SELECT * FROM \"users\" ")
// }
exports.findAll = async() => {
    const {rows} = await db.query(`
    SELECT * FROM users
    `)  
    return rows
}
exports.findOne = async(id) => {
    const queries = `
    SELECT * FROM "users"
    WHERE "id" = $1
  `  
    const values = [id]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

exports.insert = async(data)=>{
    const queries = `
    INSERT INTO "users" ("fullName","email", "password")
    VALUES ($1, $2, $3) RETURNING *
    `
    const values = [data.fullName, data.email, data.password]
    const {rows} = await db.query(queries, values)

    return rows[0]
}

exports.update = async(id, data)=>{
    const queries = `
    UPDATE "users"
    SET  "fullName"=$2, "email"=$3, "password"=$4
    WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.fullName, data.email, data.password]

    const {rows} = await db.query(queries, values)
    return rows[0]
}

exports.destroy = async(id)=>{
    const queries = `
  DELETE FROM "users"
  WHERE "id"=$1
  RETURNING *
  `
    const values = [id]

    const {rows} = await db.query(queries, values)
    return rows[0]
}
