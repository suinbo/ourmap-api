const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()

//언어 목록 조회
router.get("/login", async (req, res) => {
    try {
        const response = await axios.get("https://kauth.kakao.com/oauth/authorize", {})

        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json("RESPONSE.SERVER_ERROR")
    }
})
