import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import main from "./routes";
import "./core/Whatsapp";

const app = express();
const upload = multer();
const PORT = process.env.PORT || 3000;

app.use(upload.any());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Usa el enrutador principal que agrupa las rutas bajo '/api'
app.use("/api", main);

/**
 * Inicia el servidor en el puerto especificado
 * @param {number} PORT - Puerto en el que se iniciará el servidor
 */
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}/api`);
});
