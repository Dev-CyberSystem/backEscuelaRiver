import { Router } from 'express';
import { createMatch, getMatchesByCategory, getMatchById, updateMatch, deleteMatch, getAllMatches } from '../controllers/matches.controller.js';

const router = Router();

router.post('/', createMatch);
router.get('/', getAllMatches);
router.get('/match/:id', getMatchById);
router.put('/match/:id', updateMatch);
router.delete('/match/:id', deleteMatch);
router.get('/:category', getMatchesByCategory);

export default router;
