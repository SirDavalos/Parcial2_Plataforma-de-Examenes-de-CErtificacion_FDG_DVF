const express = require("express");
const { login, logout, getProfile } = require("../controllers/users.controller.js");
const { verifyToken, verifyPaymentFalse, verifyPaymentTrue, verifyPayment } = require("../middleware/middleware.js");
const { buildPDF, msgacceso } = require("../controllers/cert.controller.js");
const { submit_form } = require("../controllers/form.controller.js");

const router = express.Router();

router.post("/login", login);

router.post("/logout", verifyToken, logout);

router.get("/profile", verifyToken, getProfile);

router.get("/pdf", verifyToken, verifyPaymentFalse, buildPDF);

router.post("/contacto", submit_form);

router.post("/payment", verifyToken, verifyPaymentTrue, verifyPayment);

router.post("/examen", verifyToken, verifyPaymentFalse, msgacceso);

module.exports = router;