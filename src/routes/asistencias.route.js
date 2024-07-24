import { Router } from "express";
import { registrarAsistencia, obtenerAsistencias, obtenerAsistenciasPorAlumno } from "../controllers/asistencias.controller.js";
import comprobacionJwt from "../middleware/comprobacionJwt.js";

const router = Router();

router.post("/asistencias", comprobacionJwt, registrarAsistencia);
router.get("/asistencias", comprobacionJwt, obtenerAsistencias);
router.get("/asistencias/alumno/:id", comprobacionJwt, obtenerAsistenciasPorAlumno);

export default router;
