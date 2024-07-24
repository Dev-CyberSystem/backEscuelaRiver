import { Schema, model } from "mongoose";

const AlumnoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  apellido: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  dni: {
    type: Number,
    required: true,
    min: 1,
    max: 99999999,
  },
  categoria: {
    type: Number,
    required: true,
  },
  fechaNacimiento: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
    min: 1,
    max: 9999999999,
  },
  direccion: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  padreTutor: {
    type: String,
    required: true,
  },
  telefonoContacto: {
    type: Number,
    required: true,
  },
  posicion: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  fechaIngreso: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true
  },
  observaciones: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 500,
  },
  imagen: {
    type: String,
    required: true,
  },
  pagos: [{
    type: Schema.Types.ObjectId,
    ref: 'Pago'
  }],
  habilitado: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

export default model("Alumno", AlumnoSchema);
