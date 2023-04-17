const db = require("../helpers/db.helper")
const table = "reservationTickets"


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
      "reservationId",
      "sectionId",
      "quantity"
      )
    VALUES ($1, $2, $3) RETURNING *
    `
    const values = [
        data.reservationId,
        data.sectionId,
        data.quantity
    ]
    const {rows} = await db.query(queries, values)
    return rows[0]
}

exports.update = async(id, data)=>{
    const queries = `
    UPDATE "${table}" SET
    "reservationId"= $2,
    "sectionId"= $3,
    "quantity"= $4
    WHERE "id" = $1
    RETURNING *
    `
    const values = [
        id,
        data.reservationId,
        data.sectionId,
        data.quantity
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