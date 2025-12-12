const express = require("express");
const { loginUser, registerUser } = require("../controllers/user.controller");

const router = express.Router()


router.post("auth/sign-up", registerUser);
router.post("auth/login", loginUser);



module.exports = router;