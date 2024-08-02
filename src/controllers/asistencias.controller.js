import Asistencia from "../models/asistencia.model.js";
import moment from "moment-timezone";

// export const registrarAsistencia = async (req, res) => {
//   try {
//     const { alumnoId, fecha } = req.body;
//     console.log("Fecha recibida del frontend:", fecha); // Viene desde el front.

//     const fechaActual = moment().tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD");
//     console.log("Fecha actual formateada:", fechaActual);

//     // Convertimos la fecha a la zona horaria y formato deseado
//     const fechaMoment = moment.tz(fecha, "America/Argentina/Buenos_Aires").startOf('day');
//     console.log("Fecha convertida a moment:", fechaMoment.format());

//     if (fechaMoment.isAfter(fechaActual)) {
//       return res.status(400).json({ message: "No se puede registrar asistencia para fechas futuras." });
//     }

//     const asistenciaExistente = await Asistencia.findOne({ alumnoId, fecha: fechaMoment.toDate() });
//     if (asistenciaExistente) {
//       return res.status(400).json({ message: "La asistencia ya ha sido registrada para esta fecha." });
//     }

//     const nuevaAsistencia = new Asistencia({ alumnoId, fecha: fechaMoment.toDate() });
//     console.log("Fecha a guardar en la base de datos:", nuevaAsistencia.fecha);

//     await nuevaAsistencia.save();
//     res.status(201).json(nuevaAsistencia);
//   } catch (error) {
//     res.status(400).json({ message: "Error al registrar la asistencia", error });
//   }
// };
export const registrarAsistencia = async (req, res) => {
  try {
    const { alumnoId, fecha } = req.body;
    console.log("Fecha recibida del frontend:", fecha);

    // Fecha actual ajustada al inicio del día en la zona horaria local
    const fechaActual = moment().tz("America/Argentina/Buenos_Aires").startOf('day');
    console.log("Fecha actual formateada:", fechaActual.format("YYYY-MM-DD"));

    // Fecha recibida ajustada al inicio del día en la zona horaria local
    const fechaMoment = moment.tz(fecha, "America/Argentina/Buenos_Aires").startOf('day');
    console.log("Fecha convertida a moment:", fechaMoment.format("YYYY-MM-DD"));

    if (fechaMoment.isAfter(fechaActual)) {
      return res.status(400).json({ message: "No se puede registrar asistencia para fechas futuras." });
    }

    const asistenciaExistente = await Asistencia.findOne({ alumnoId, fecha: fechaMoment.toDate() });
    if (asistenciaExistente) {
      return res.status(400).json({ message: "La asistencia ya ha sido registrada para esta fecha." });
    }

    const nuevaAsistencia = new Asistencia({ alumnoId, fecha: fechaMoment.toDate() });
    console.log("Fecha a guardar en la base de datos:", nuevaAsistencia.fecha);

    await nuevaAsistencia.save();
    res.status(201).json(nuevaAsistencia);
  } catch (error) {
    res.status(400).json({ message: "Error al registrar la asistencia", error });
  }
};
export const obtenerAsistencias = async (req, res) => {
  try {
    const { fecha } = req.query;
    console.log("Fecha recibida en obtenerAsistencias:", fecha);
    let filter = {};

    if (fecha) {
      const fechaInicio = moment.tz(fecha, "America/Argentina/Buenos_Aires").startOf('day').toDate();
      console.log("Fecha inicio:", fechaInicio);

      const fechaFin = moment.tz(fecha, "America/Argentina/Buenos_Aires").endOf('day').toDate();
      console.log("Fecha fin:", fechaFin);

      filter.fecha = { $gte: fechaInicio, $lt: fechaFin };
    }
    console.log("Filtro aplicado:", filter);
    const asistencias = await Asistencia.find(filter).populate('alumnoId');
    console.log("Asistencias encontradas:", asistencias);
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
