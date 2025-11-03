const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 3000;

app.listen(port, () => {
    console.log("Servidor escuchando en puerto " + port);
});