const express = require("express");
const { login, logout, getProfile, verifyPayment } = require("../controllers/users.controller.js");
const { verifyToken, verifyPaymentFalse, verifyPaymentTrue } = require("../middleware/middleware.js");
const { buildPDF } = require("../controllers/cert.controller.js");
const { submit_form } = require("../controllers/form.controller.js");

const router = express.Router();

router.post("/login", login);

router.post("/logout", verifyToken, logout);

router.get("/profile", verifyToken, getProfile);

router.get("/pdf", verifyToken, buildPDF);

router.post("/contacto", submit_form);

router.post("/payment", verifyToken, verifyPaymentFalse, verifyPaymentTrue, verifyPayment);

module.exports = router;