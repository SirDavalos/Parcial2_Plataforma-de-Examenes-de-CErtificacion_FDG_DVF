const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.port || 3000;

const ALLOWED_ORIGINS = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
];

app.use(cors({ 
  origin: function (origin, callback) {
    
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true); // null = sin error, true = permitido
    }
    // Si el origen no está permitido, se rechaza la solicitud con un mensaje de error.
    return callback(new Error('Not allowed by CORS: ' + origin));
  },

  // Especifica los métodos HTTP que este servidor aceptará.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],

  // Algunos navegadores antiguos esperan un código 200 (en lugar de 204) en respuestas "preflight".
  optionsSuccessStatus: 200
}));

app.use(express.json());

const Routes = require("./routes/routes.js");
app.use("/api", Routes)

app.listen(port, () => {
    console.log("Servidor escuchando en puerto " + port);
});

//Ruta de salud
app.get("/health", (req, res) => res.json({ok: true}));