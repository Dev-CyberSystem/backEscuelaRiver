import Asistencia from "../models/asistencia.model.js";

export const registrarAsistencia = async (req, res) => {
  try {
    const { alumnoId } = req.body;
    const fecha = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD

    // Verificar si ya existe un registro de asistencia para el mismo alumno en la misma fecha
    const asistenciaExistente = await Asistencia.findOne({ alumnoId, fecha });
    if (asistenciaExistente) {
      return res.status(400).json({ message: "La asistencia ya ha sido registrada para hoy." });
    }

    const nuevaAsistencia = new Asistencia({ alumnoId, fecha });
    await nuevaAsistencia.save();
    res.status(201).json(nuevaAsistencia);
  } catch (error) {
    res.status(400).json({ message: "Error al registrar la asistencia", error });
  }
};

export const obtenerAsistencias = async (req, res) => {
  try {
    const asistencias = await Asistencia.find().populate("alumnoId");
    res.status(200).json(asistencias);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener las asistencias", error });
  }
};

export const obtenerAsistenciasPorAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const asistencias = await Asistencia.find({ alumnoId: id });
    res.status(200).json(asistencias);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener las asistencias del alumno", error });
  }
};

export const getAsistencias = async (req, res) => {
    try {
      const { fecha, categoria, genero } = req.query;
      let filter = {};
  
      if (fecha) {
        const fechaInicio = new Date(fecha);
        const fechaFin = new Date(fecha);
        fechaFin.setDate(fechaFin.getDate() + 1); // Para incluir todo el día
        filter.fecha = { $gte: fechaInicio, $lt: fechaFin };
      }
  
      if (categoria) {
        filter["alumnoId.categoria"] = parseInt(categoria);
      }
  
      if (genero) {
        filter["alumnoId.genero"] = genero;
      }
  
      const asistencias = await Asistencia.find(filter).populate('alumnoId');
      res.status(200).json(asistencias);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las asistencias' });
    }
  };