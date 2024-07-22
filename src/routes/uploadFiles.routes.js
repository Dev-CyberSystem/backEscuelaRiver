import express from 'express';
import { uploadFiles } from './controllers/alumnos.controller'; // Ajusta la ruta según sea necesario

const router = express.Router();

router.post('/upload', uploadFiles);

export default router;
