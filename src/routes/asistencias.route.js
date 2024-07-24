import { Router } from "express";
import { registrarAsistencia, obtenerAsistencias, obtenerAsistenciasPorAlumno } from "../controllers/asistencias.controller.js";

const router = Router();

router.post("/asistencias", registrarAsistencia);
router.get("/asistencias", obtenerAsistencias);
router.get("/asistencias/alumno/:id", obtenerAsistenciasPorAlumno);

export default router;
