const db = require("../helpers/db.helper")
const table = "reservations"


exports.findAll = async(page, limit, search, sort, sortBy) => {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit
    const queries = `
    SELECT * FROM "${table}" WHERE "id"::TEXT LIKE $3 ORDER BY "${sort}" ${sortBy} LIMIT $1 OFFSET $2
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

exports.findByUserId = async(id) => {
    const queries = `
    SELECT * FROM "${table}"
    WHERE "userId" = $1
    `  
    const values = [id]
    const {rows} = await db.query(queries,values)  
    return rows
}

exports.countOurHistory = async (id) => {
  
    const queries = `
    SELECT
    COUNT(*) AS "totalData"
    FROM "${table}" "r"
    WHERE "r"."userId" = $1
    `
    const values = [id]
    const {rows} = await db.query(queries, values)
    return rows[0]
}

exports.findHistoryByUserId = async(id, page, limit, sort, sortBy) => {
    page = parseInt(page) || 1
    limit = parseInt(limit) || 4
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit
    const queries = `
    SELECT
    reservations."id", 
    events.title, 
    cities."name" AS "location", 
    events."date",
    reservations."createdAt" AS "reservationDate",
    "paymentMethods".name AS "paymentMethod"
    FROM
    "${table}"
    LEFT JOIN
    events
    ON 
      reservations."eventId" = events."id"
    LEFT JOIN
    cities
    ON 
      events."cityId" = cities."id"
    LEFT JOIN
    "paymentMethods"
    ON 
      reservations."paymentMethodId" = "paymentMethods"."id"
    WHERE reservations."userId" = $1
    ORDER BY "${sort}" ${sortBy} LIMIT $2 OFFSET $3
    `
    const values = [id, limit, offset]
    const {rows} = await db.query(queries,values)  
    return rows
}

exports.findHistoryByIdAndUserId = async(id, userId) => {
    const queries = `
    SELECT
    "r"."id" AS "reservationId",
    "e"."id" AS "eventId",
    "e"."picture",
    "e"."title",
    "c"."name" AS "location",
    "e"."date",
    "rsec"."name" AS "ticketSection",
    "rsec"."price" AS "ticketPrice",
    "rt"."quantity",
    ("rsec"."price"::numeric * "rt"."quantity"::numeric) AS "totalPrice",
    "rstat"."name" AS "paymentStatus",
    "pm"."name" AS "paymentMethod",
    "r"."createdAt" AS "paymentDate"

    FROM "${table}" "r"
    INNER JOIN "events" "e" ON "e"."id" = "r"."eventId"
    INNER JOIN "cities" "c" ON "c"."id" = "e"."cityId"
    INNER JOIN "reservationStatus" "rstat" ON "rstat"."id" = "r"."statusId"
    INNER JOIN "paymentMethods" "pm" ON "pm"."id" = "r"."paymentMethodId"
    INNER JOIN "reservationTickets" "rt" ON "rt"."reservationId" = "r"."id"
    INNER JOIN "reservationSections" "rsec" ON "rsec"."id" = "rt"."sectionId"
    WHERE "r"."id" = $1 AND "r"."userId" = $2
    `  
    const values = [id, userId]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

exports.findByIdAndUserId = async(id, userId) => {
    const queries = `
    SELECT * FROM "${table}"
    WHERE "id" = $1 AND "userId" = $2
  `  
    const values = [id, userId]
    const {rows} = await db.query(queries,values)  
    return rows[0]
}

exports.insert = async(data)=>{
    const queries = `
    INSERT INTO "${table}" (
      "eventId",
      "userId",
      "statusId",
      "paymentMethodId"
      )
    VALUES ($1, $2, $3, $4) RETURNING *
    `
    const values = [
        data.eventId,
        data.userId,
        data.statusId,
        data.paymentMethodId
    ]
    const {rows} = await db.query(queries, values)
    return rows[0]
}

exports.update = async(id, data)=>{
    const queries = `
    UPDATE "${table}" SET
    "eventId"= COALESCE(NULLIF($2::INTEGER, NULL), "eventId"),
    "userId"= COALESCE(NULLIF($3::INTEGER, NULL), "userId"),
    "statusId"= COALESCE(NULLIF($4::INTEGER, NULL), "statusId"),
    "paymentMethodId"= COALESCE(NULLIF($5::INTEGER, NULL), "paymentMethodId")
    WHERE "id" = $1
    RETURNING *
    `
    const values = [
        id,
        data.eventId,
        data.userId,
        data.statusId,
        data.paymentMethodId
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
