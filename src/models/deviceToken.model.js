const db = require("../helpers/db.helper")
const table = "deviceToken"


exports.findAll = async(page, limit) => {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 10
    const offset = (page - 1) * limit
    const queries = `
  SELECT * FROM "${table}" LIMIT $1 OFFSET $2
  `
    const values = [limit, offset]
    const {rows} = await db.query(queries, values)  
    return rows
}

exports.insertToken = async (id, data) => {
    const query = `
    INSERT INTO "${table}" ("userId","token")
    VALUES ($1, $2) RETURNING *
  `
    const values = [id, data.token]
    const {rows} = await db.query(query, values)
    return rows[0]
}
