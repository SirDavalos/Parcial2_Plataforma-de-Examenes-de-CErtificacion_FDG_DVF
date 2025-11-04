const express = require("express");
const { login } = require("../controllers/questions.controller.js");

const router = express.Router();

router.post("/login", console.login);
router.get("/login", (req, res) => {res.send("Hello World!")})

module.exports = router;