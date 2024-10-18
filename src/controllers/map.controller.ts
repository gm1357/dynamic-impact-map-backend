import { Request, Response } from 'express';
import { MapService } from '../services/map.service';

export class MapController {
  private mapService: MapService;

  constructor() {
    this.mapService = new MapService();
  }

  async getUsStatesMap(req: Request, res: Response) {
    try {
      const data = await this.mapService.getUsStatesMapData();
      res.json(data);
    } catch (error) {
      console.error('Error in getUsStatesMap controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
