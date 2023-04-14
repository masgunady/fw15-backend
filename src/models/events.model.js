const db = require("../helpers/db.helper")
const table = "events"


exports.findAll = async(page, limit, search, sort, sortBy) => {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit
    const queries = `
    SELECT * FROM "${table}" WHERE "title" LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
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

exports.insert = async(data)=>{
    const queries = `
    INSERT INTO "${table}" (
      "picture",
      "title",
      "date",
      "cityId",
      "descriptions"
      )
    VALUES ($1, $2, $3, $4, $5) RETURNING *
    `
    const values = [
        data.picture,
        data.title,
        data.date,
        data.cityId,
        data.descriptions
    ]
    const {rows} = await db.query(queries, values)

    return rows[0]
}

exports.update = async(id, data)=>{
    const queries = `
    UPDATE "${table}" SET
    "picture"=COALESCE(NULLIF($2,''), "picture"),
    "title"=COALESCE(NULLIF($3,''), "title"),
    "date"=$4,
    "cityId"=$5,
    "descriptions"=COALESCE(NULLIF($6,''), "descriptions")
    WHERE "id"=$1
    RETURNING *
    `
    const values = [
        id,
        data.picture,
        data.title,
        data.date,
        data.cityId,
        data.descriptions
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
