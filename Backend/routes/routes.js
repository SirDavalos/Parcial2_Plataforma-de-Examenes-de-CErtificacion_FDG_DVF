const express = require("express");
const { login, logout, getProfile, verifyPayment } = require("../controllers/users.controller.js");
const { verifyToken, verifyPaymentFalse, verifyPaymentTrue } = require("../middleware/middleware.js");
const { buildPFD } = require("../controllers/cert.controller.js");

const router = express.Router();

router.post("/login", login);

router.post("/logout", verifyToken, logout);

router.get("/profile", verifyToken, getProfile);

router.get("/pdf", verifyToken, buildPFD);

router.post("/payment", verifyToken, verifyPaymentFalse, verifyPaymentTrue, verifyPayment);

module.exports = router;