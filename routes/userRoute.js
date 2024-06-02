const express = require("express")
const { createUser, loginUser, getallUser } = require("../controller/userCtrl")

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', createUser)
router.get("/all-users", getallUser)

module.exports = router
