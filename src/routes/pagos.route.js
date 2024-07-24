import { Router } from 'express';
import { registrarPago, verificarPagosPendientes } from '../controllers/pagos.controller.js';

const router = Router();

router.post('/pago/:id', registrarPago);
router.get('/pagos-pendientes', verificarPagosPendientes);

export default router;
