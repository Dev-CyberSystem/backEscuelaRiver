import Pago from '../models/pago.model.js';
import Alumno from '../models/alumnos.model.js';

export const registrarPago = async (req, res) => {
    const { alumnoId, mes, monto, fechaPago } = req.body;
  
    try {
      const nuevoPago = new Pago({ alumnoId, mes, monto, fechaPago });
      await nuevoPago.save();
  
      const alumno = await Alumno.findById(alumnoId);
      if (alumno) {
        alumno.pagos.push(nuevoPago._id);
        await alumno.save();
      }
  
      res.status(201).json(nuevoPago);
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar el pago', error });
    }
  };

export const getPagos = async (req, res) => {
  try {
    const pagos = await Pago.find().populate('alumnoId');
    res.status(200).json(pagos);
  } catch (error) {
    console.error('Error al obtener pagos:', error);
    res.status(500).json({ message: 'Error al obtener pagos' });
  }
};

export const getPagosPorAlumno = async (req, res) => {
    const { alumnoId } = req.params;
  
    try {
      const pagos = await Pago.find({ alumnoId });
      res.status(200).json(pagos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los pagos', error });
    }
  };
