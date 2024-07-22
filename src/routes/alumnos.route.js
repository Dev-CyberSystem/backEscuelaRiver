import { Router } from 'express';
import { getAllAlumnos, getAlumnoById, createAlumno, updateAlumno, deleteAlumno, getAlumnoByDni, getAlumnoByPosicion } from '../controllers/alumnos.controller.js';
import upload from '../middleware/multer.js';

const router = Router();

router.get('/alumnos', getAllAlumnos);
router.get('/alumno/:id', getAlumnoById);
router.post('/alumnos', upload.single('imagen'), createAlumno);
router.put('/alumno/:id', upload.single('imagen'), updateAlumno);
router.delete('/alumnos/:id', deleteAlumno);
router.get('/alumno/dni/:dni', getAlumnoByDni);
router.get('/alumno/posicion/:posicion', getAlumnoByPosicion);

export default router;
