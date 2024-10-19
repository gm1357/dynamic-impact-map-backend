import express from 'express';
import { MapController } from '../controllers/map.controller';

const router = express.Router();
const mapController = new MapController();

router.get('/usa-states/geojson', (req, res) => mapController.getUSAStatesMap(req, res));
router.get('/usa-states', (req, res) => mapController.getUSAStates(req, res));

export default router;
