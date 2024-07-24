import Alumno from "../models/alumnos.model.js";

export const registrarPago = async (req, res) => {
  const { id } = req.params;
  const { mes } = req.body;

  try {
    const alumno = await Alumno.findById(id);
    if (!alumno) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    const pago = {
      mes,
      pagado: true,
      fechaPago: new Date(),
    };

    alumno.pagos.push(pago); 
    await alumno.save();

    res.status(200).json({ message: "Pago registrado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verificarPagosPendientes = async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    const hoy = new Date();
    const dia = hoy.getDate();
    const mesActual = hoy.toLocaleString('default', { month: 'long' });

    if (dia <= 15) {
      return res.status(200).json([]);
    }

    const alumnosConPagosPendientes = alumnos.filter(alumno => {
      const pagosDelMes = alumno.pagos.find(pago => pago.mes === mesActual && pago.pagado);
      return !pagosDelMes;
    });

    res.status(200).json(alumnosConPagosPendientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
