import { Request, Response } from 'express';
import { MapService } from '../services/map.service';

export class MapController {
  private mapService: MapService;

  constructor() {
    this.mapService = new MapService();
  }

  async getUSAStatesMap(req: Request, res: Response) {
    try {
      const data = await this.mapService.getUSAStatesMapData();
      res.json(data);
    } catch (error) {
      console.error('Error in getUsStatesMap controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUSAStates(req: Request, res: Response) {
    try {
      const states = await this.mapService.getUSAStates();
      res.json(states);
    } catch (error) {
      console.error('Error in getUsStates controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
