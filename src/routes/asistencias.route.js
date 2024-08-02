import { Router } from "express";
import { registrarAsistencia, obtenerAsistencias, obtenerAsistenciasPorAlumno } from "../controllers/asistencias.controller.js";

const router = Router();

router.post("/asistencias/registro", registrarAsistencia);
router.get("/asistencias", obtenerAsistencias);
router.get("/asistencias/alumno/:id", obtenerAsistenciasPorAlumno);

export default router;
