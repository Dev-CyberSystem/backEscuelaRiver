import Asistencia from "../models/asistencia.model.js";

export const registrarAsistencia = async (req, res) => {
  try {
    const { alumnoId, fecha } = req.body;
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
