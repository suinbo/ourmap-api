const express = require("express")
const app = express()
const cors = require("cors")

// 모든 프론트엔드 서버 허용
app.use(cors())

app.set("port", process.env.PORT || 3000) // 포트 설정
app.set("host", process.env.HOST || "0.0.0.0") // 아이피 설정

// 루트 접속시 아이피 출력
app.get("/", function (req, res) {
    res.send("접속된 아이피: " + req.ip)
})

// 서버 동작 출력
app.listen(app.get("port"), app.get("host"), () =>
    console.log("Server is running on : " + app.get("host") + ":" + app.get("port"))
)

// '/admins' 경로로 들어오는 요청에 대해서만 router 동작
const adminRouter = require("./routes")
app.use("/api", adminRouter)
