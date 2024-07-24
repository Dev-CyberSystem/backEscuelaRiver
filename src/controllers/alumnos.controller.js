import Alumno from "../models/alumnos.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.status(200).json(alumnos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAlumnoById = async (req, res) => {
  const { id } = req.params;

  try {
    const alumnoFound = await Alumno.findById(id);

    if (!alumnoFound) {
      return res
        .status(404)
        .json({ message: "No hemos podido encontrar el alumno solicitado" });
    }

    res.status(200).json(alumnoFound);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createAlumno = async (req, res) => {
  const {
    nombre,
    apellido,
    dni,
    categoria,
    fechaNacimiento,
    telefono,
    direccion,
    email,
    padreTutor,
    telefonoContacto,
    posicion,
    fechaIngreso,
    genero,
    observaciones,
  } = req.body;

  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  try {
    let imagenUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "uploads",
        width: 150,
        height: 150,
        crop: "fill", // Esta opción asegura que la imagen será redimensionada exactamente a 150x150 píxeles
      });
      imagenUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // Eliminar el archivo local después de subirlo a Cloudinary
    }

    const newAlumno = new Alumno({
      nombre,
      apellido,
      dni,
      categoria,
      fechaNacimiento,
      telefono,
      direccion,
      email,
      padreTutor,
      telefonoContacto,
      posicion,
      fechaIngreso,
      genero,
      observaciones,
      imagen: imagenUrl, // Guarda la URL de la imagen en la base de datos
    });

    await newAlumno.save();
    res.status(201).json({
      message: "El alumno se ha creado exitosamente",
      alumno: newAlumno,
    });
  } catch (error) {
    console.error("Error al crear alumno:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateAlumno = async (req, res) => {
  const { id } = req.params;

  try {
    let updateData = { ...req.body };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "uploads",
        width: 150,
        height: 150,
        crop: "fill",
      });
      updateData.imagen = result.secure_url;
      fs.unlinkSync(req.file.path); // Eliminar el archivo local después de subirlo a Cloudinary
    }

    const alumnoUpdated = await Alumno.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!alumnoUpdated) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    res.status(200).json(alumnoUpdated);
  } catch (error) {
    console.error("Error al actualizar el alumno:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAlumno = async (req, res) => {
  const { id } = req.params;

  try {
    const alumno = await Alumno.findById(id);

    if (!alumno) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    // Eliminar la imagen de Cloudinary
    const publicId = alumno.imagen.split('/').pop().split('.')[0]; // Extraer el public_id de la URL
    await cloudinary.uploader.destroy(`uploads/${publicId}`, (error, result) => {
      if (error) {
        console.error('Error al eliminar la imagen de Cloudinary:', error);
      } else {
        console.log('Resultado de la eliminación de Cloudinary:', result);
      }
    });

    // Eliminar el documento de la base de datos
    await Alumno.findByIdAndDelete(id);

    res.status(200).json({ message: "El alumno ha sido eliminado exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAlumnoByDni = async (req, res) => {
  const { dni } = req.params;

  try {
    const alumnoFound = await Alumno.findOne({ dni });

    if (!alumnoFound) {
      return res
        .status(404)
        .json({ message: "No hemos podido encontrar el alumno solicitado" });
    }

    res.status(200).json(alumnoFound);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAlumnoByPosicion = async (req, res) => {
  const { posicion } = req.params;

  try {
    const alumnoFound = await Alumno.findOne({
      posicion: { $regex: new RegExp(posicion, "i") },
    });

    if (!alumnoFound) {
      return res
        .status(404)
        .json({ message: "No hemos podido encontrar el alumno solicitado" });
    }

    res.status(200).json(alumnoFound);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
