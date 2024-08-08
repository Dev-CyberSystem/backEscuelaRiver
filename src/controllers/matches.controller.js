import Match from '../models/match.js';


export const createMatch = async (req, res) => {
    const { category, date, time, opponent, convocatedPlayers, field, address, result, yellowCards, redCards, goals, yellowCardPlayers, redCardPlayers, observations, location } = req.body;
  
    try {
      const newMatch = new Match({
        category,
        date,
        time,
        opponent,
        convocatedPlayers,
        field,
        address,
        result,
        yellowCards,
        redCards,
        goals,
        yellowCardPlayers,
        redCardPlayers,
        observations,
        location
      });
  
      await newMatch.save();
      res.status(201).json(newMatch);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el partido', error });
    }
  };

export const getAllMatches = async (req, res) => {
    try {
      const matches = await Match.find().populate('convocatedPlayers');
      res.json(matches);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los partidos', error });
    }
  };
export const getMatchesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const matches = await Match.find({ category }).populate('convocatedPlayers');
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los partidos', error });
  }
};

export const getMatchById = async (req, res) => {
  const { id } = req.params;

  try {
    const match = await Match.findById(id).populate('convocatedPlayers');
    if (!match) {
      return res.status(404).json({ message: 'Partido no encontrado' });
    }
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el partido', error });
  }
};

export const deleteMatch = async (req, res) => {
  const { id } = req.params;

  try {
    const match = await Match.findByIdAndDelete(id);
    if (!match) {
      return res.status(404).json({ message: 'Partido no encontrado' });
    }
    res.status(200).json({ message: 'Partido eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el partido', error });
  }
};

export const updateMatch = async (req, res) => {
    const { id } = req.params;
    const { resultStatus, resultScore, location, ...otherData } = req.body;
  
    try {
      const updatedMatch = await Match.findByIdAndUpdate(
        id,
        { $set: { resultStatus, resultScore, location, ...otherData } },
        { new: true, runValidators: true }
      );
      if (!updatedMatch) {
        return res.status(404).json({ message: 'Partido no encontrado' });
      }
      res.status(200).json(updatedMatch);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el partido', error });
    }
  };