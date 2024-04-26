const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()

// 로그인
router.post("/getKakao", async (req, res) => {
    try {
        console.log("headers:: ", req.headers)
        console.log("body:: ", req.body)

        await axios
            .post("https://kauth.kakao.com/oauth/token", {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
                body: {
                    grant_type: "authorization_code",
                    client_id: "304c6bc5d7275c6f37ccd6bf08550bb2",
                    redirect_uri: "http://localhost:5173/ourmap.github.io/auth",
                    code: req.query.code,
                },
            })
            .then(res => {
                return res.status(200).json(res)
            })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json("RESPONSE.SERVER_ERROR")
    }
})

module.exports = router
