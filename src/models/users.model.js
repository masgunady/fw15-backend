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
    INSERT INTO "users" ("email", "password")
    VALUES ($1, $2) RETURNING *
    `
    const values = [data.email, data.password]
    const {rows} = await db.query(queries, values)

    return rows[0]
}

exports.update = async(id, data)=>{
    const queries = `
    UPDATE "users"
    SET  "email"=$2, "password"=$3
    WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.email, data.password]

    const {rows} = await db.query(queries, values)
    return rows
}

exports.destroy = async(id)=>{
    const queries = `
  DELETE FROM "users"
  WHERE "id"=$1
  RETURNING *
  `
    const values = [id]

    const {rows} = await db.query(queries, values)
    return rows
}
