import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import main from "./routes";
import "./core/Whatsapp";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Y esto

app.use(cors());

// Usa el enrutador principal que agrupa las rutas bajo '/api'
app.use("/api", main);

app.get("/", (req, res) => {
  res.send("¡API REST con JWT!");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/api`);
});
