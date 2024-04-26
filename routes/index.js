const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()

// 로그인
router.get("/login", async (req, res) => {
    try {
        const response = await axios.get("https://kauth.kakao.com/oauth/authorize", {})
        return response
    } catch (error) {
        console.log(error.message)
        return res.status(500).json("RESPONSE.SERVER_ERROR")
    }
})

module.exports = router
