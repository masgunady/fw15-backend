const db = require("../helpers/db.helper")
const table = "profiles"

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
    SELECT * FROM "${table}" WHERE "fullName" LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
    `
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(queries, values)  
    return rows
}
exports.findOne = async(id) => {
    const queries = `
    SELECT * FROM "${table}"
    WHERE "id" = $1
  `  
    const values = [id]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}
exports.findPict = async(id) => {
    const queries = `
    SELECT "picture" FROM "${table}"
    WHERE "id" = $1
  `  
    const values = [id]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

// exports.findOneByEmail = async(email) => {
//     const queries = `
//   SELECT * FROM "${table}"
//   WHERE "email" = $1
// `  
//     const values = [email]
//     const {rows} = await db.query(queries,values)  
//     return rows[0]
// }

exports.insert = async(data)=>{
    const queries = `
    INSERT INTO "${table}" (
      "userId",
      "picture",
      "fullName",
      "phoneNumber",
      "gender",
      "profession",
      "nationality",
      "birthDate"
      )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `
    const values = [
        data.userId,
        data.picture,
        data.fullName,
        data.phoneNumber,
        data.gender,
        data.profession,
        data.nationality,
        data.birthDate,
    ]
    const {rows} = await db.query(queries, values)

    return rows[0]
}

exports.update = async(id, data)=>{
    const queries = `
    UPDATE "${table}" SET
    "username"=COALESCE(NULLIF($2,''),"username"),
    "email"=COALESCE(NULLIF($3,''), "email"),
    "password"=COALESCE(NULLIF($4,''), "password")
    WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.username, data.email, data.password]

    const {rows} = await db.query(queries, values)
    return rows[0]
}

exports.destroy = async(id)=>{
    const queries = `
  DELETE FROM "${table}"
  WHERE "id"=$1
  RETURNING *
  `
    const values = [id]

    const {rows} = await db.query(queries, values)
    return rows[0]
}
