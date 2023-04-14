const db = require("../helpers/db.helper")
const table = "eventCategories"


exports.findAll = async() => {
    const queries = `
    SELECT * FROM "${table}"
    `
    const {rows} = await db.query(queries)  
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
      "eventId",
      "categoryId"
      )
    VALUES ($1, $2) RETURNING *
    `
    const values = [
        data.eventId,
        data.categoryId
    ]
    const {rows} = await db.query(queries, values)
    return rows[0]
}

exports.update = async(id, data)=>{
    const queries = `
    UPDATE "${table}" SET
    "eventId"=$2,
    "categoryId"=$3
    WHERE "id"=$1
    RETURNING *
    `
    const values = [
        id,
        data.eventId,
        data.categoryId
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
