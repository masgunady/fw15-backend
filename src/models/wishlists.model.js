const db = require("../helpers/db.helper")
const table = "wishlists"


exports.findAll = async(page, limit) => {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    const offset = (page - 1) * limit
    const queries = `
    SELECT * FROM "${table}" LIMIT $1 OFFSET $2
    `
    const values = [limit, offset]
    const {rows} = await db.query(queries, values)  
    return rows
}
// exports.findAll = async(page, limit, search, sort, sortBy) => {
//     page = parseInt(page) || 1
//     limit = parseInt(limit) || 5
//     search = search || ""
//     sort = sort || "id"
//     sortBy = sortBy || "ASC"
//     const offset = (page - 1) * limit
//     const queries = `
//     SELECT * FROM "${table}" WHERE "id" LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
//     `
//     const values = [limit, offset, `%${search}%`]
//     const {rows} = await db.query(queries, values)  
//     return rows
// }

exports.findOne = async(id) => {
    const queries = `
    SELECT * FROM "${table}"
    WHERE "id" = $1
  `  
    const values = [id]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

exports.insert = async(data)=>{
    const queries = `
    INSERT INTO "${table}" (
      "eventId",
      "userId"
      )
    VALUES ($1, $2) RETURNING *
    `
    const values = [
        data.eventId,
        data.userId
    ]
    const {rows} = await db.query(queries, values)
    return rows[0]
}

exports.update = async(id, data)=>{
    const queries = `
    UPDATE "${table}" SET
    "eventId"= $2,
    "userId"= $3
    WHERE "id" = $1
    RETURNING *
    `
    const values = [
        id,
        data.eventId,
        data.userId
    ]

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