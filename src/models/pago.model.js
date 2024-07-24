import mongoose from 'mongoose';

const PagoSchema = new mongoose.Schema({
  alumno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno',
    required: true
  },
  mes: {
    type: Number,
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  fechaPago: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Pago', PagoSchema);
