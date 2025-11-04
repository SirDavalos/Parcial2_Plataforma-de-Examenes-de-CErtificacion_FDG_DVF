const express = require("express");
const { login, logout, getProfile } = require("../controllers/users.controller.js");
const { verifyToken } = require("../middleware/middleware.js");
const { buildPFD} = require("../controllers/cert.controller.js");

const router = express.Router();

router.post("/login", login);

router.post("/logout", verifyToken, logout);

router.get("/profile", verifyToken, getProfile);

router.get("/pdf", createPFD);

module.exports = router;