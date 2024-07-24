import { Router } from 'express';
import { registrarPago, getPagos, getPagosPorAlumno } from '../controllers/pagos.controller.js';
import comprobacionJwt from '../middleware/comprobacionJwt.js';

const router = Router();

router.post('/pagos', comprobacionJwt, registrarPago);
router.get('/pagos', comprobacionJwt, getPagos);
router.get('/pagos/alumno/:alumnoId', comprobacionJwt, getPagosPorAlumno);

export default router;
