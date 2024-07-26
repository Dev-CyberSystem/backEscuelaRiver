import Asistencia from "../models/asistencia.model.js";
import moment from "moment-timezone";

export const registrarAsistencia = async (req, res) => {
  try {
    const { alumnoId, fecha } = req.body;
    console.log(alumnoId, fecha, 'fechaaaaaaa');

    // Parsear y formatear la fecha correctamente
    const fechaFormateada = moment.tz(fecha, "DD-MM-YYYY", "America/Argentina/Buenos_Aires").format("YYYY-MM-DD");
    console.log(fechaFormateada, "fechaFormateada");

    // Verificar si la fecha no es posterior a la fecha actual
    const fechaActual = moment().tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD");
    console.log(fechaActual, "fechaActual");
    if (moment(fecha).isAfter(fechaActual)) {
      return res.status(400).json({ message: "No se puede registrar asistencia para fechas futuras." });
    }

    // Verificar si ya existe un registro de asistencia para el mismo alumno en la misma fecha
    const asistenciaExistente = await Asistencia.findOne({ alumnoId, fecha });
    if (asistenciaExistente) {
      return res.status(400).json({ message: "La asistencia ya ha sido registrada para esta fecha." });
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
    const { fecha } = req.query;
    console.log(fecha, "fecha obtenerAsistencias");
    let filter = {};

    if (fecha) {
      const fechaInicio = new Date(fecha);
      fechaInicio.setHours(0, 0, 0, 0);
      console.log(fechaInicio, "fechaInicio");
      const fechaFin = new Date(fecha);
      fechaFin.setHours(23, 59, 59, 999);
      console.log(fechaFin, "fechaFin");
      filter.fecha = { $gte: fechaInicio, $lt: fechaFin };
    }
    console.log(filter, "filter");
    const asistencias = await Asistencia.find(filter).populate('alumnoId');
    console.log(asistencias, "asistencias");
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
