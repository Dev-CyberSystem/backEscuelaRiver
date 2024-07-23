import express from "express";
import { PORT } from "./config/config.js";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/users.routes.js";
import privateRouter from "./routes/private.route.js";
import comprobacionJwt from "./middleware/comprobacionJwt.js";
import alumnoRouter from "./routes/alumnos.route.js";
import fs from 'fs';
import path from 'path';
import "./db/db_connection.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Definir la ruta absoluta para la carpeta de subidas
const __dirname = path.resolve();
const uploadsDir = path.join(__dirname, 'uploads');

// Crear la carpeta 'uploads' si no existe
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
// Rutas
app.use("/api", alumnoRouter);
app.use("/api", userRouter);
// app.use("/api", comprobacionJwt, privateRouter);

app.get("/", (req, res) => {
  res.send("Bienvenido a la API Escuelas River Tucumán");
});

app.listen(PORT, async () => {
  console.log(`La aplicación está escuchando en el puerto ${PORT}`);
});
