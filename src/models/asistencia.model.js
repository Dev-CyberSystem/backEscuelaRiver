import { Schema, model } from "mongoose";

const AsistenciaSchema = new Schema({
  alumnoId: {
    type: Schema.Types.ObjectId,
    ref: "Alumno",
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  asistio: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default model("Asistencia", AsistenciaSchema);
