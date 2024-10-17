import express from 'express';
import pastorController from '../controllers/pastor.controller';

const router = express.Router();

router.get('/:pastorId/impact-map', pastorController.getImpactMap);

export default router;
