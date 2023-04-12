const db = require("../helpers/db.helper")

// exports.findUser = function(){
//     return db.query("SELECT * FROM \"users\" ")
// }
exports.findAll = async(page, limit, search, sort, sortBy) => {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit
    const queries = `
    SELECT * FROM "users" WHERE "email" LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
    `
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(queries, values)  
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

exports.findOneByEmail = async(email) => {
    const queries = `
  SELECT * FROM "users"
  WHERE "email" = $1
`  
    const values = [email]
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
    SET  "fullName"=COALESCE(NULLIF($2,''),"fullName"), "email"=COALESCE(NULLIF($3,''), "email"), "password"=COALESCE(NULLIF($4,''), "password")
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
