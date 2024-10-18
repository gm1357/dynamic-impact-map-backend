import express from 'express';
import pastorController from '../controllers/pastor.controller';

const router = express.Router();

router.get('/:pastorId', pastorController.getPastorInfo);
router.get('/:pastorId/impact-map', pastorController.getImpactMap);
router.get('/:pastorId/engagement-stats', pastorController.getEngagementStats);

export default router;
