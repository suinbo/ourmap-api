const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()

// 로그인
router.get("/login", async (req, res) => {
    try {
        await axios
            .get("https://kauth.kakao.com/oauth/authorize", {
                params: {
                    client_id: "304c6bc5d7275c6f37ccd6bf08550bb2",
                    redirect_uri: "http://localhost:5173",
                    response_type: "code",
                },
            })
            .then(res => {
                console.log("res:: ", res)
            })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json("RESPONSE.SERVER_ERROR")
    }
})

module.exports = router
