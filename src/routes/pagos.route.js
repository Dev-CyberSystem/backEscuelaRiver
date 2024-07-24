import { Router } from 'express';
import { registrarPago, getPagos, getPagosPorMes, getPagosPorAlumno, verificarPagos } from '../controllers/pagos.controller.js';

const router = Router();

router.post('/pagos', registrarPago);
router.get('/pagos', getPagos);
router.get('/pagos/:mes', getPagosPorMes);
router.get('/pagos/alumno/:id', getPagosPorAlumno);
router.get('/verificar-pagos', verificarPagos);

export default router;
