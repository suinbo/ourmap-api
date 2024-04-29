const mysql = require("mysql2")

// Create the connection pool
const pool = mysql.createPool({
    host: "database.c5qwoc6wy0mb.ap-northeast-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "kck5028046*",
    database: "db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

// 특정 유저의 세션 ID 조회
const getMarker = async (sDate, eDate) => {
    try {
        const promisePool = pool.promise()
        const [rows] = await promisePool.query(
            `select a.place, a.visited_date as date, a.description, a.groupId, b.name as groupNm, a.lat, a.lng from db.marker a 
            join db.marker_group b on a.groupId = b.id
            where a.visited_date >= ? and a.visited_date < ? order by a.visited_date asc`,
            [sDate, eDate]
        )
        return rows
    } catch (error) {
        console.error("Error:", error)
        return null
    }
}

module.exports = {
    getMarker,
}
