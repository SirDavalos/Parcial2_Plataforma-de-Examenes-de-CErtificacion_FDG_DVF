const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(cors());

const Routes = require("./routes/routes.js");
const user = require("./controllers/questions.controller.js")
app.use("api/routes", Routes)

app.listen(port, () => {
    console.log("Servidor escuchando en puerto " + port);
});

//Ruta de salud
app.get("/health", (req, res) => res.json({ok: true}));