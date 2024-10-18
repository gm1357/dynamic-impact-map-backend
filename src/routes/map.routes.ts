import express from 'express';
import { MapController } from '../controllers/map.controller';

const router = express.Router();
const mapController = new MapController();

router.get('/us-states', (req, res) => mapController.getUsStatesMap(req, res));

export default router;
