const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()
const markerDB = require("../db/markerDB")
const { getDateString } = require("./utils")

// 로그인
router.post("/getKakao", async (req, res) => {
    try {
        await axios
            .post(
                "https://kauth.kakao.com/oauth/token",
                {
                    grant_type: "authorization_code",
                    client_id: "304c6bc5d7275c6f37ccd6bf08550bb2",
                    redirect_uri: "http://localhost:5173/ourmap.github.io/auth",
                    code: req.body.code,
                },
                {
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                }
            )
            .then(response => {
                return res.status(200).json(response.data)
            })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json("RESPONSE.SERVER_ERROR")
    }
})

// 사용자 정보 가져오기
router.post("/getUser", async (req, res) => {
    try {
        await axios
            .post(
                "https://kapi.kakao.com/v2/user/me",
                {
                    target_id_type: "user_id",
                    property_keys: ["kakao_account.profile", "kakao_account.nickname"],
                },
                {
                    headers: {
                        Authorization: `Bearer ${req.body.token}`,
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                }
            )
            .then(response => {
                return res.status(200).json(response.data)
            })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json("RESPONSE.SERVER_ERROR")
    }
})

// 마커 리스트 가져오기
router.get("/getMarker", async (req, res) => {
    const { sDate, eDate } = req.query
    const list = await markerDB.getMarker(sDate, eDate)

    return res.status(200).json({
        data: {
            list: list.map((item, index) => ({
                no: index + 1,
                ...item,
                date: getDateString(item.date),
            })),
            totalCnt: list.length,
        },
    })
})

module.exports = router
