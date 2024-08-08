import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno',
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  }
});

const goalSchema = new mongoose.Schema({
  player: {
    type: playerSchema,
    required: true,
  },
  minute: {
    type: Number,
    required: true,
  }
});

const cardSchema = new mongoose.Schema({
  player: {
    type: playerSchema,
    required: true,
  },
  minute: {
    type: Number,
    required: true,
  }
});

const matchSchema = new mongoose.Schema({
  category: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  opponent: {
    type: String,
    required: true,
  },
  convocatedPlayers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno',
  }],
  field: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  resultStatus: {
    type: String,
    enum: ['Ganado', 'Perdido', 'Empatado', 'No jugado', 'Suspendido'],
    default: 'No jugado',
  },
  resultScore: {
    type: String,
    default: '',
  },
  yellowCards: {
    type: Number,
    default: 0,
  },
  redCards: {
    type: Number,
    default: 0,
  },
  goals: [goalSchema],
  yellowCardPlayers: [cardSchema],
  redCardPlayers: [cardSchema],
  observations: {
    type: String,
    default: '',
  },
  location: { 
    type: String,
    enum: ['Local', 'Visitante'],
    required: true,
  }
}, {
  timestamps: true,
});

export default mongoose.model('Match', matchSchema);
