import { Schema, model } from "mongoose";

const PagoSchema = new Schema({
  alumnoId: {
    type: Schema.Types.ObjectId,
    ref: 'Alumno',
    required: true,
  },
  mes: {
    type: Number,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  fechaPago: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true,
});

export default model("Pago", PagoSchema);
