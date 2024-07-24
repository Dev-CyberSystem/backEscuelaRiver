import Pago from '../models/pago.model.js';
import Alumno from '../models/alumnos.model.js' ;

// Registrar un pago
export const registrarPago = async (req, res) => {
  const { alumnoId, mes, monto, fechaPago } = req.body;

  try {
    const alumno = await Alumno.findById(alumnoId);
    if (!alumno) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    const nuevoPago = new Pago({
      alumno: alumnoId,
      mes,
      monto,
      fechaPago
    });

    const pagoGuardado = await nuevoPago.save();
    res.status(201).json(pagoGuardado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener todos los pagos
export const getPagos = async (req, res) => {
  try {
    const pagos = await Pago.find().populate('alumno');
    res.status(200).json(pagos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener pagos por mes
export const getPagosPorMes = async (req, res) => {
  const { mes } = req.params;

  try {
    const pagos = await Pago.find({ mes }).populate('alumno');
    res.status(200).json(pagos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener pagos por alumno
export const getPagosPorAlumno = async (req, res) => {
  const { id } = req.params;

  try {
    const pagos = await Pago.find({ alumno: id }).populate('alumno');
    res.status(200).json(pagos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Verificar pagos al día 15 de cada mes
export const verificarPagos = async (req, res) => {
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth() + 1;
  const diaActual = fechaActual.getDate();

  try {
    const pagosMesActual = await Pago.find({ mes: mesActual }).populate('alumno');
    const alumnosPagaron = pagosMesActual.map(pago => pago.alumno._id.toString());
    const alumnosInhabilitados = await Alumno.find({ _id: { $nin: alumnosPagaron } });

    if (diaActual > 15) {
      return res.status(200).json({
        message: "Hay alumnos que no han pagado la cuota mensual",
        alumnosInhabilitados
      });
    } else {
      return res.status(200).json({
        message: "Todos los alumnos han pagado la cuota mensual a tiempo"
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Exportar todas las funciones
// export default {
//   registrarPago,
//   getPagos,
//   getPagosPorMes,
//   getPagosPorAlumno,
//   verificarPagos
// };
