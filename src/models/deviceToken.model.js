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

exports.findOneByToken = async(token) => {
    const query = `
  SELECT * FROM "${table}"
  WHERE "token" = $1
`
    const values = [token]
    const {rows} = await db.query(query, values)
    return rows[0]
}
exports.updateUserIdByToken = async(token, id) => {
    const query = `
UPDATE "${table}"
SET "userId" = $2
  WHERE "token" = $1
`
    const values = [token, id]
    const {rows} = await db.query(query, values)
    return rows[0]
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
